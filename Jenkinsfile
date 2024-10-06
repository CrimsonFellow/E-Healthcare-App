pipeline {
    agent { label 'ec2-agent' } // Ensures all stages run on EC2 Agent

    environment {
        REGISTRY = "crimsony"
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials'
        SSH_CREDENTIALS_ID = 'EC2_SSH_CREDENTIALS' // ID from Jenkins credentials
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
                    sh './mvnw clean test'    // Replaced `bat` with `sh` for Linux
                    sh './mvnw clean package' // Replaced `bat` with `sh` for Linux
                }
            }
        }

        stage('Build and Test Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'  // Replaced `bat` with `sh` for Linux
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build' // Replaced `bat` with `sh` for Linux
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
    
    post {
        always {
            echo 'Cleaning up temporary files and workspace'
            cleanWs()
        }
    }
}
