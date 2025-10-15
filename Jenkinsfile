pipeline {
  agent any

  tools{
    nodejs "nodejs"
  }

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
  }

  post {
    success {
      echo 'NodeApp deployed successfully!'
    }
    failure {
      echo 'Build or deployment failed!'
    }
  }
}
