const { execSync } = require('child_process');
const services = require(`${__dirname}/toBuild.json`);

if (services && services.length > 0) {

    services.forEach((service)=>{

        console.log('We going to Deploy Service: ',service.name);
        console.log('In the Version: ',service.version);

        execSync (`${__dirname}/install-gcloud.sh`, { stdio: [0, 1, 2] });
        console.log('Deployment not yet enabled')
        console.log(`Command:  kubectl set image deployment/${service.name} ${service.name}=openintegrationhub/${service.name}:${service.version}`)
        // execSync (`kubectl set image deployment/${service.name} ${service.name}=openintegrationhub/${service.name}:${service.version}`, { stdio: [0, 1, 2] });
    });
} else {
    console.log('No Changes to Services!')
}
