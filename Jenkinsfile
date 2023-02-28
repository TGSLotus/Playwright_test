pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwrightLv1.29.2-focal'
        }
    }
    stages {
        stage('install playwright') {
            steps {
                sh'''
                    npm i -D @playwright/test
                    npx playwright install
                '''
            }
        }
        stage(run) {
            steps {
                sh 'npx playwright test ${test_number} --headed --project=chromium --repeat-each=${number_of_runs}'
            }
        }
    }
}