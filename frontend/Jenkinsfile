pipeline {
    agent any
    environment {
        DOCKER_USERNAME = 'crimsony'  // Your Docker Hub username
        DOCKER_PASSWORD = 'Sp@rky1225chance'  // Your Docker Hub password
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/CrimsonFellow/healthcare-angular-frontend'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Build') {
            steps {
                bat 'npm run build --prod'
            }
        }
        stage('Archive Artifacts') {
            steps {
                archiveArtifacts 'dist/**'
            }
        }
        stage('Docker Build') {
            steps {
                script {
                    def angularImage = docker.build("${DOCKER_USERNAME}/angular-app")
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
                    def angularImage = docker.image("${DOCKER_USERNAME}/angular-app")
                    angularImage.push('latest')
                }
            }
        }
    }
}
