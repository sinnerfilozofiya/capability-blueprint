pipeline {
    agent any

    environment {
        PROJECT_DIR = "/var/www/portfolio"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/sinnerfilozofiya/capability-blueprint.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
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
                rm -rf $PROJECT_DIR/*
                cp -r dist/* $PROJECT_DIR/
                '''
            }
        }

    }

    post {
        success {
            echo "Deployment successful"
        }

        failure {
            echo "Build failed"
        }
    }
}
