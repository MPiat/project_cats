kubectl apply -f ./myredis/myredis-deployment.yml

kubectl apply -f ./myredis/my-redis-configMap.yml

kubectl apply -f ./myredis/myredis-clusterip.yml

kubectl apply -f ./mypostgres/postgres-pvc.yml

kubectl apply -f ./mypostgres/pv-local.yml

kubectl apply -f ./mypostgres/postgres-secret.yml

kubectl apply -f ./mypostgres/postgres-clusterip.yml

kubectl apply -f ./mypostgres/postgres-configMap.yml

kubectl apply -f ./mypostgres/postgres-deployment.yml

kubectl apply -f ./mybackend/mybackendlb-clusterip.yaml

kubectl apply -f ./mybackend/mybackendlb-deploy.yaml

kubectl apply -f ./mybackend/mybackendlb-node-port.yaml
