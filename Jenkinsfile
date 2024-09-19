pipeline {
    agent any
    environment {
        DOCKER_USERNAME = 'crimsony'  
        DOCKER_PASSWORD = 'Sp@rky1225chance'  
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/CrimsonFellow/healthcare-springboot-backend.git'
            }
        }
        stage('Build') {
            steps {
                dir('healthcare-app') { 
                    bat 'mvn clean package'
                }
            }
        }
        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'healthcare-app/target/*.jar', fingerprint: true
            }
        }
        stage('Docker Build') {
            steps {
                script {
                    def backendImage = docker.build("${DOCKER_USERNAME}/springboot-backend")
                }
            }
        }
        stage('Docker Login') {
            steps {
                script {
                    docker.withRegistry('', "${DOCKER_USERNAME}-credentials") {
                        sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                    }
                }
            }
        }
        stage('Docker Push') {
            steps {
                script {
                    def backendImage = docker.image("${DOCKER_USERNAME}/springboot-backend")
                    backendImage.push('latest')
                }
            }
        }
    }
}

