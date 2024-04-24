import { describe, it, before, after } from "mocha";
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
    });

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

    it('Prueba endpoint POST con ERROR EMAIL INVALIDO /registro => Registra un usuario en BD, en caso de exito rerige a /login', async function () {
        let userIncompleto = {
            first_name: "Fran",
            last_name: "Aguilera TEST",
            age: 27,
            email: "Coder@test.com",
            password: "Prueba1234",
            rol: "premium",
        }
        let respuesta = await requester
            .post('/api/sessions/registro')
            .send({
                ...userIncompleto
            });
        expect(respuesta.statusCode).to.equal(200);
        expect(respuesta.text).to.include('EMAIL INVALIDO');
    });
    
    it('Prueba endpoint POST /registro => Registra un usuario en BD, en caso de exito rerige a /login', async function () {
        let respuesta = await requester
            .post('/api/sessions/registro')
            .send({
                ...user
            });
        expect(respuesta.statusCode).to.equal(302);
        expect(respuesta.headers.location).to.equal('/login');
    });

    it('Prueba endpoint POST con ERROR YA EXISTEN USUARIOS /registro => Registra un usuario en BD, en caso de exito rerige a /login', async function () {
        let userIncompleto = {
            first_name: "Fran",
            last_name: "Aguilera TEST",
            age: 27,
            email: "Coder@test.com",
            password: "Prueba1234",
            rol: "premium",
        }
        let respuesta = await requester
            .post('/api/sessions/registro')
            .send({
                ...userIncompleto
            });
        expect(respuesta.statusCode).to.equal(200);
        expect(respuesta.text).to.include('YA EXISTEN USUARIOS EN BD CON ESE EMAIL');
    });
    
    it('Prueba endpoint POST con ERROR MISSING CREDENTIALS /login => Registra un usuario en BD, en caso de exito rerige a /current. Además genera un token de seguridad que se guarda en cookies.', async function () {
        let datos = {
            email: user.email
        }
        let respuesta = await requester.post('/api/sessions/login').send({
            ...datos
        });
        expect(respuesta.statusCode).to.equal(200);
        expect(respuesta.text).to.include('Missing credentials');
    });

    it('Prueba endpoint POST con ERROR EMAIL INVALIDO /login => Registra un usuario en BD, en caso de exito rerige a /current. Además genera un token de seguridad que se guarda en cookies.', async function () {
        let datos = {
            email: "emailInvalido",
            password: "111"
        }
        let respuesta = await requester.post('/api/sessions/login').send({
            ...datos
        });
        expect(respuesta.statusCode).to.equal(200);
        expect(respuesta.text).to.include('EMAIL INVALIDO');
    });

    it('Prueba endpoint POST con ERROR DATOS INVALIDOS /login => Registra un usuario en BD, en caso de exito rerige a /current. Además genera un token de seguridad que se guarda en cookies.', async function () {
        let datos = {
            email: "emailerroneo@erroneo.com",
            password: "incorrecta"
        }
        let respuesta = await requester.post('/api/sessions/login').send({
            ...datos
        });
        expect(respuesta.statusCode).to.equal(200);
        expect(respuesta.text).to.include('ERROR EN DATOS, REVISEN');
    });

    it('Prueba endpoint POST con ERROR DATOS INVALIDOS (CONTRASEÑA) /login => Registra un usuario en BD, en caso de exito rerige a /current. Además genera un token de seguridad que se guarda en cookies.', async function () {
        let datos = {
            email: user.email,
            password: "111"
        }
        let respuesta = await requester.post('/api/sessions/login').send({
            ...datos
        });
        expect(respuesta.statusCode).to.equal(200);
        expect(respuesta.text).to.include('DATOS INVALIDOS');
    });

    it('Prueba endpoint POST /login => Registra un usuario en BD, en caso de exito rerige a /current. Además genera un token de seguridad que se guarda en cookies.', async function () {
        let datos = {
            email: user.email,
            password: user.password
        }
        let respuesta = await requester.post('/api/sessions/login').send({
            ...datos
        });
        const cookies = respuesta.headers['set-cookie'];
        const cookieFound = cookies.some(cookie => cookie.includes('CookieUser'));

        expect(cookieFound).to.be.true;
        expect(respuesta.statusCode).to.equal(302);
        expect(respuesta.headers.location).to.equal('/current');
    });

    it('Prueba endpoint GET /current => Muestra una vista, donde se observa el perfil del usuario', async function () {
        let token = await genToken(user);
        let respuesta = await requester.get('/current').set("Cookie", `CookieUser=${token}`);
        expect(respuesta.statusCode).to.be.equal(200);
        expect(respuesta.ok).to.be.true;
    });

    it('Prueba endpoint GET /logout => Elimina las cookies, cerrando así la sesión del usuario, en caso de exito redirige a vista login.', async function () {
        let token = await genToken(user);
        let respuesta = await requester.get('/api/sessions/logout').set("Cookie", `CookieUser=${token}`);
        expect(respuesta.statusCode).to.be.equal(302);
        expect(respuesta.headers.location).to.equal('/login');
    });

});
