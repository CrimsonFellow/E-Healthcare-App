pipeline {
    agent any

    environment {
        REGISTRY = "crimsony"
        IMAGE_NAME = "e-healthcare-app"
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials'
        SSH_SERVER_NAME = 'EC2-Instance' // Name used in Publish over SSH configuration
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
                publishOverSsh(
                    server: SSH_SERVER_NAME,
                    command: '''
                        cd E-Healthcare-App || git clone https://github.com/CrimsonFellow/E-Healthcare-App.git
                        cd E-Healthcare-App
                        git pull
                        sudo docker-compose pull
                        sudo docker-compose down
                        sudo docker-compose up -d
                    '''
                )
            }
        }
    }
}


