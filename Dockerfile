FROM cypress/included:8.6.0
WORKDIR /app
# Install npm dependencies, can also use "npm ci"
# # Install awscli v2 for S3 and SNS access
# RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
# RUN unzip awscliv2.zip
# RUN ./aws/install

# Copy our test page and test files
COPY cypress.config.js ./
COPY package.json ./
COPY reporter-config.json ./
COPY cypress ./cypress

RUN npm install 

COPY runtest.sh ./

COPY runtest-new.sh ./