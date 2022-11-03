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

echo "Uploading test result to ${S3_BUCKET}"
local_test_result="report.zip"
obj_path=${S3_BUKCET_RESULTS_PATH_PREFIX}/${SPEC}-test-result.zip
aws s3 cp ${local_test_result} s3://${S3_BUCKET}/${obj_path}