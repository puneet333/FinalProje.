import { app } from '../../app';
import request from 'supertest';
import {User} from '../../schema/UserSchema';

describe('signup', () => {
    it('email is missing', async () => {
        const res = await request(app).post('/signup').send({password: '1234', name: 'qwerty'});

        expect(res.statusCode).toEqual(422);
    });
    it('name is missing', async () => {
        const res = await request(app).post('/signup').send({email: 'xyz@abc.com', password: '1234'});
       
        expect(res.statusCode).toEqual(422);
    });
    it('password is incorrect', async () => {
        const res = await request(app).post('/signup').send({email: 'abc@xyz.com', name: '12345'});
        
        expect(res.statusCode).toEqual(422);
    });
});

describe('signup', () => {
    it('email already present', async () => {
        const mockUserFind = jest.fn();
        mockUserFind.mockResolvedValue({});
        User.findOne = mockUserFind;
        const res = await request(app).post('/signup').send({email: 'abc@abc.com', name: 'qwerty', password: '1234'});
        expect(res.statusCode).toEqual(422);
        expect(res.body).toEqual({error:"user already exists with that email"});
    });
});