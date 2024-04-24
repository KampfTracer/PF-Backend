import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import { config } from "../config/config.js";
import { genToken } from "../utils.js";

const requester = supertest("http://localhost:8080");

describe('TESTING A ROUTER DE SESSIONS', function () {
    this.timeout(7000);
    let user = {
        first_name: "Fran",
        last_name: "Aguilera TEST",
        age: 27,
        email: "Coder@test.com",
        password: "Prueba1234",
        rol: "premium",
    };

    before(async function () {
        try {
            await mongoose.connect(config.MONGO_URL);
        } catch (error) {
            console.log(error.message);
        }
    });
    after(async function () {
        await mongoose.connection
            .collection("users")
            .deleteMany({
                email: "Coder@test.com"
            });
        await mongoose.connection
            .collection("carts")
            .deleteMany({
                title: "Carro de: Lovera TEST"
            });
    })

    // Pruebas de registro, login, y sesión actual
    it('Prueba endpoint POST con ERROR COMPLETE DATOS /registro => Registra un usuario en BD, en caso de exito rerige a /login', async function () {
        let userIncompleto = {
            email: "Coder@test.com",
            password: "Prueba1233",
            rol: "premium",
        }
        let respuesta = await requester
            .post('/api/sessions/registro')
            .send({
                ...userIncompleto
            });
        expect(respuesta.statusCode).to.equal(200);
        expect(respuesta.text).to.include('COMPLETE LOS DATOS');
    });

    // Otras pruebas aquí...

    it('Prueba endpoint GET /current => Muestra una vista, donde se observa el perfil del usuario', async function () {
        let token = await genToken(user);
        let respuesta = await requester.get('/current').set("Cookie", `CookieUser=${token}`);
        expect(respuesta.statusCode).to.be.equal(200);
        expect(respuesta.ok).to.be.true;
    });
    it('Prueba endpoint GET /logout => Elimina las cookies, Cerrando asi la sesion del usuario, en caso de exito Redirige a vista login.', async function () {
        let token = await genToken(user);
        let respuesta = await requester.get('/api/sessions/logout').set("Cookie", `CookieUser=${token}`);
        expect(respuesta.statusCode).to.be.equal(302)
        expect(respuesta.headers.location).to.equal('/login');
    });

});
