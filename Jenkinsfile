pipeline {
    agent any

    environment {
        REGISTRY = "crimsony"
        IMAGE_NAME = "e-healthcare-app"
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials'
        EC2_PRIVATE_KEY = 'EC2_PRIVATE_KEY_FILE' 
        EC2_IP = '54.162.249.232'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/CrimsonFellow/E-Healthcare-App'
            }
        }

        stage('Build and Test Backend') {
            steps {
                dir('backend') {
                    bat '.\\mvnw.cmd clean test'
                    bat '.\\mvnw.cmd clean package'
                }
            }
        }

        stage('Build and Test Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker-compose build'
            }
        }

        stage('Deploy to EC2') {
            steps {
                withCredentials([file(credentialsId: 'EC2_PRIVATE_KEY_FILE', variable: 'EC2_KEY_FILE')]) {
                    bat """
                    @echo off
                    set EC2_USER=ubuntu
                    set EC2_HOST=%EC2_IP%
                    set PRIVATE_KEY_PATH=%EC2_KEY_FILE%
                    set COMMANDS=cd E-Healthcare-App || git clone https://github.com/CrimsonFellow/E-Healthcare-App.git && cd E-Healthcare-App && git pull && sudo docker-compose pull && sudo docker-compose down && sudo docker-compose up -d

                    echo Adjusting permissions on the private key file...
                    icacls "%PRIVATE_KEY_PATH%" /inheritance:r
                    icacls "%PRIVATE_KEY_PATH%" /grant:r "%USERNAME%:R"
                    icacls "%PRIVATE_KEY_PATH%" /remove:g "Everyone"

                    echo Executing deployment commands on EC2 instance...
                    ssh -o "StrictHostKeyChecking=no" -i "%PRIVATE_KEY_PATH%" %EC2_USER%@%EC2_HOST% "%COMMANDS%"
                    """
                }
            }
        }
    }
}


