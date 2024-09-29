pipeline {
    agent any

    environment {
        REGISTRY = "crimsony"
        IMAGE_NAME = "e-healthcare-app"
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials'
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
                }
            }
        }

        stage('Build and Test Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run test'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker-compose build'
            }
        }

        stage('Push Docker Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CREDENTIALS, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    bat """
                    docker login -u %USERNAME% -p %PASSWORD%
                    docker tag healthcare-frontend %REGISTRY%/healthcare-frontend:latest
                    docker tag healthcare-backend %REGISTRY%/healthcare-backend:latest
                    docker push %REGISTRY%/healthcare-frontend:latest
                    docker push %REGISTRY%/healthcare-backend:latest
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker-compose down'
                bat 'docker-compose up -d'
            }
        }
    }
}
