pipeline {
  agent any

  stages {

    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/Hazzimov/todoAppNode.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy with Host Podman') {
      steps {
        script {
          sh '''
            podman-compose up -d
          '''
        }
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