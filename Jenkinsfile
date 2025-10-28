pipeline {
  agent any

    environment {
    GH_TOKEN = credentials('48141ed0-8cd7-469b-8318-6ab01eba61e9')
}

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

        stage('Archive Artifact') {
            steps {
                sh 'tar -czf todoAppNode.tar.gz dist/'
                archiveArtifacts artifacts: 'todoAppNode.tar.gz'
            }
        }

        stage('Upload to GitHub Release') {
            steps {
                    sh '''
                      gh release create v1.0.0 todoAppNode.tar.gz \
                        --repo Hazzimov/todoAppNode \
                        --title "todoAppNode v1.0.0" \
                        --notes "Automated release"
                    '''
                }
            }

        stage('Checkout inventory') {
      steps {
        git branch: 'main', url: 'https://github.com/Hazzimov/ansible.git'
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