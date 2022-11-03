#!/bin/bash
option=$@
echo "Test suite: $option"

echo "Starting test"
npx cypress run $option

echo "Generate report"
npm run report:merge
npm run report:generate
npm run report:copyScreenshots
npm run report:zip

echo "Uploading test result to ${S3_OBJECT_URL}"
local_test_result="report.zip"
aws s3 cp ${local_test_result} ${S3_OBJECT_URL}

echo "Sending notification"
msg_topic="Cypress Test Job finished: ${JOB_NAME}"
aws sns publish --cli-input-json "{\"TopicArn\":\"${SNS_TOPIC}\",\"Subject\":\"${msg_topic}\",\"Message\":\"Started by Github user: ${GITHUB_USER}\\nTest Spec: ${option}\\nRun on branch: ${TEST_BRANCH}\\n\\nResult details: ${PRESIGNED_URL}\\nTest result file in S3: ${S3_OBJECT_URL}\"}"
