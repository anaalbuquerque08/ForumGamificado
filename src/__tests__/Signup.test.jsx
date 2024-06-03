import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from '../Pages/Signup';


//Realizei 2 testes no Signup:
describe('<Signup />', () => {
    it('Deve renderizar corretamente', () => {
        render(
            <BrowserRouter>
                <Signup />
            </BrowserRouter>
        );
        
        const nomeInput = screen.getByPlaceholderText('Digite seu nome');
        const usernameInput = screen.getByPlaceholderText('Digite seu @username');
        const emailInput = screen.getByPlaceholderText('Digite seu email');
        const emailConfInput = screen.getByPlaceholderText('Confirme o email');
        const senhaInput = screen.getByPlaceholderText('Digite sua senha');
        
        expect(nomeInput).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(emailConfInput).toBeInTheDocument();
        expect(senhaInput).toBeInTheDocument();
    });

    it('Deve atualizar o estado ao digitar nos inputs', () => {
        render(
            <BrowserRouter>
                <Signup />
            </BrowserRouter>
        );
        
        const nomeInput = screen.getByPlaceholderText('Digite seu nome');
        const usernameInput = screen.getByPlaceholderText('Digite seu @username');
        const emailInput = screen.getByPlaceholderText('Digite seu email');
        const emailConfInput = screen.getByPlaceholderText('Confirme o email');
        const senhaInput = screen.getByPlaceholderText('Digite sua senha');

        fireEvent.change(nomeInput, { target: { value: 'Teste Nome' } });
        fireEvent.change(usernameInput, { target: { value: 'TesteUsername' } });
        fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
        fireEvent.change(emailConfInput, { target: { value: 'teste@teste.com' } });
        fireEvent.change(senhaInput, { target: { value: '123456' } });

        expect(nomeInput.value).toBe('Teste Nome');
        expect(usernameInput.value).toBe('TesteUsername');
        expect(emailInput.value).toBe('teste@teste.com');
        expect(emailConfInput.value).toBe('teste@teste.com');
        expect(senhaInput.value).toBe('123456');
    });

});
