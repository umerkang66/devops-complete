docker build -t ugulzar4512/multi-client:latest -t ugulzar4512/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t ugulzar4512/multi-server:latest -t ugulzar4512/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t ugulzar4512/multi-worker:latest -t ugulzar4512/multi-worker:$SHA -f ./worker/Dockerfile ./worker

# we are already logged in inside docker through travis, this docker command is the same command
docker push ugulzar4512/multi-client:latest
docker push ugulzar4512/multi-server:latest
docker push ugulzar4512/multi-worker:latest

docker push ugulzar4512/multi-client:$SHA
docker push ugulzar4512/multi-server:$SHA
docker push ugulzar4512/multi-worker:$SHA

# kubectl is provided by gcloud
kubectl apply -f k8s

kubectl set image deployments/server-deployment server=ugulzar4512/multi-server:$SHA
kubectl set image deployments/client-deployment client=ugulzar4512/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=ugulzar4512/multi-worker:$SHA
