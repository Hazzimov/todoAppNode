pipeline {
  agent any

  stages {

    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/Hazzimov/todoAppNode.git'
      }
    }

    stage('Install dependencies') {
            steps {
                sh '''
                    cd $WORKSPACE
                    npm ci || npm install
                '''
            }
        }

        stage('Build app') {
            steps {
                sh '''
                    cd $WORKSPACE
                    npm run build || echo "No build step defined"
                '''
            }
        }

        stage('Deploy with Podman Compose') {
            steps {
                sh '''
                    cd $WORKSPACE
                    podman-compose down || true
                    podman-compose up -d
                '''
            }
    }
  }

  post {
    success {
      echo '✅ NodeApp deployed successfully using host Podman socket!'
    }
    failure {
      echo '❌ Build or deployment failed!'
    }
  }
}