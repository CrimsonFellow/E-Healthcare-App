pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    // Pull the latest code
                    checkout scm
                }
                // Build Docker containers
                bat '''
                    docker-compose down
                    docker-compose up --build -d
                '''
            }
        }
        stage('Test') {
            steps {
                // Add any tests you want to run here, e.g., unit tests
                bat 'docker-compose exec springboot-app mvn test'
            }
        }
        stage('Deploy') {
            steps {
                // Deploy to a server or another environment
                bat 'echo "Deploying to production..."'
            }
        }
    }
    post {
        always {
            // Cleanup Docker containers after the build
            bat 'docker-compose down --remove-orphans'
        }
    }
}


