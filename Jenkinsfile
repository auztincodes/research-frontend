pipeline {
    agent any
    stages {
        stage('Prepare') {
            steps {
                echo 'Volley Frontend Prepare Stage'
                sh 'node -v'
                sh 'npm -v'
            }
        }
    stage('Deploy') {
        when {
              branch 'develop'
            }
            steps {
                echo 'Volley Frontend  Stage'
                sh 'ssh projects@44.239.126.131 "cd volley-frontend && git stash && git pull origin develop && npm install && npm run build && pm2 restart volley-frontend "'
            }
        }
    }
}