import { createServer, Factory, Model, Response } from 'miragejs';
import faker from 'faker';
import { User } from '../../types/user';

export function CreateServer(){
    const server = createServer({
        models: {
            user: Model.extend<Partial<User>>({}),
        },

        factories: {
            user: Factory.extend({
                id(index){
                    return index;
                },
                name(){
                    return (faker.name.findName() + " " + faker.name.lastName()).toLowerCase();
                },
                createdAt(){
                    return faker.date.recent().toLocaleDateString("pt-br", {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    });
                },
                email(){
                    return faker.internet.email();
                },
            })
        },

        seeds(server){
            server.createList('user', 200);
        },

        routes() {
            this.namespace = "api";
            this.timing = 750;

            this.get("/users", (schema, request) => {
                const { page = 1, perPage = 10 } = request.params;

                const total = 200;
                const pageStart = (Number(page) - 1) * Number(perPage);
                const pageEnd = pageStart + Number(perPage);

                const users = schema.all("user").models.slice(pageStart, pageEnd);
                
                return new Response(
                    200,
                    { 'x-total-count': String(total) },
                    { users },
                );
            });
            this.post("/users");
            
            this.namespace = "";
            this.passthrough();
        }
    });

    return server;
}