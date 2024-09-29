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
                    sh './mvnw clean test'
                }
            }
        }

        stage('Build and Test Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run test'  
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_HUB_CREDENTIALS) {
                        sh """
                        docker tag healthcare-frontend $REGISTRY/healthcare-frontend:latest
                        docker tag healthcare-backend $REGISTRY/healthcare-backend:latest

                        docker push $REGISTRY/healthcare-frontend:latest
                        docker push $REGISTRY/healthcare-backend:latest
                        """
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }
    }
}
