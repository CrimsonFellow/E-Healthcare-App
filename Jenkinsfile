pipeline {
    agent { label 'ec2-agent' } // Ensures all stages run on EC2 Agent

    tools {
        git 'Default' // Ensure the pipeline uses the 'Default' Git configuration that you have set
    }

    environment {
        REGISTRY = "crimsony"
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials'
        SSH_CREDENTIALS_ID = 'EC2_SSH_CREDENTIALS' // ID from Jenkins credentials
        EC2_IP = '18.208.170.68' // Replace with your EC2 instance's public IP
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
                    sh 'chmod +x ./mvnw'  
                    sh './mvnw clean test'
                    sh './mvnw clean package'
                }
            }
        }

        stage('Build and Test Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'  // Ensure npm is installed on the agent
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshCommand remote: [
                    name: 'EC2 Instance',
                    host: "${EC2_IP}",
                    user: 'ubuntu',
                    credentialsId: SSH_CREDENTIALS_ID,
                    port: 22,
                    allowAnyHosts: true
                ], command: '''
                    # Update the E-Healthcare-App repository or clone if it doesn't exist
                    if [ ! -d "E-Healthcare-App" ]; then
                        git clone https://github.com/CrimsonFellow/E-Healthcare-App.git
                    fi
                    cd E-Healthcare-App

                    # Ensure we're on the main branch and pull the latest changes
                    git checkout main
                    git pull

                    # Ensure Docker Compose is up to date
                    sudo docker-compose pull

                    # Restart the Docker containers
                    sudo docker-compose down
                    sudo docker-compose up -d
                '''
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs() // Clean workspace after the build
        }
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
