pipeline {
    agent any

    environment {
        PROJECT_DIR = "/var/www/portfolio"
        GITHUB_CONTEXT = "Jenkins CI"
    }

    stages {

        stage('Notify GitHub Build Start') {
            steps {
                script {
                    githubNotify context: "${GITHUB_CONTEXT}", status: "PENDING"
                }
            }
        }

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Node Version') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint (optional)') {
            steps {
                sh 'npm run lint || true'
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                echo "Clearing old files..."
                rm -rf $PROJECT_DIR/*

                echo "Copying build files..."
                cp -r dist/* $PROJECT_DIR/

                echo "Deployment complete"
                '''
            }
        }
    }

    post {

        success {
            script {
                githubNotify context: "${GITHUB_CONTEXT}", status: "SUCCESS"
            }
        }

        failure {
            script {
                githubNotify context: "${GITHUB_CONTEXT}", status: "FAILURE"
            }
        }

        unstable {
            script {
                githubNotify context: "${GITHUB_CONTEXT}", status: "ERROR"
            }
        }
    }
}
