pipeline {
    agent any

    environment {
        REGISTRY = "crimsony"
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials-id'
        SSH_CREDENTIALS_ID = 'ec2-ssh-credentials' // ID from Jenkins credentials
        EC2_IP = '54.162.249.232' // Replace with your EC2 instance's public IP
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

        stage('Deploy to EC2') {
            steps {
                sshCommand remote: [ 
                    name: 'EC2 Instance', 
                    host: "${EC2_IP}", 
                    user: 'ubuntu', 
                    identityFile: '', 
                    credentialsId: SSH_CREDENTIALS_ID,
                    port: 22 
                ], command: '''
                    cd E-Healthcare-App || git clone https://github.com/CrimsonFellow/E-Healthcare-App.git
                    cd E-Healthcare-App
                    git pull
                    sudo docker-compose pull
                    sudo docker-compose down
                    sudo docker-compose up -d
                '''
            }
        }
    }
}



