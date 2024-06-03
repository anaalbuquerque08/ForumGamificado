import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Signin from "../Pages/Signin";
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Signin />', () => {
    it('Deve render o botão de login e funcionar o evento corretamente', () => {
        render(
          <Router>
            <Signin />
          </Router>
        );
        
        const buttonLogin = screen.getByRole('button', { name: 'Entrar' });
        
        expect(buttonLogin).toBeInTheDocument();
        
        expect(buttonLogin).toBeEnabled();
        
        fireEvent.click(buttonLogin);
        
        console.log(buttonLogin);
    });
});

