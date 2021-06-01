import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { ChevronDown, LogOut } from 'react-feather';
import Logo from '../../assets/ctech.png';
import NoProfile from '../../assets/noprofile.png';

function Header() {


    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (

        <ChevronDown color="#808080"
            style={{ cursor: 'pointer' }}
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }} />
    ));

    return (
        <>
            <div className="container-header">
                <div className="texto-header">Cadastro de cobranças</div>
                <div className="main-header">
                    <div className="main-header-line">
                        <div className="item-header">
                            <img className="imagem-logo" src={Logo} />
                        </div>
                        <div className="item-header active">COBRANÇAS RECEBIDAS</div>
                    </div>
                    <div className="header-user-info">

                        <div>
                            <img className="imagem-logo" src={NoProfile} />
                        </div>
                        <div className="personal-info">
                            <div>Nome do Usuário</div>
                            <div>387 **** **** **</div>
                        </div>

                        <Dropdown>

                            <Dropdown.Toggle as={CustomToggle} />

                            <Dropdown.Menu show={true}>
                                <Dropdown.Item>
                                    <div className="header-user-info">

                                        <div>
                                            <img className="imagem-logo" src={NoProfile} />
                                        </div>
                                        <div className="personal-info">
                                            <div>Nome do Usuário</div>
                                            <div>387 **** **** **</div>
                                        </div>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Item className="item-dropdown meu-perfil"><label>MEU PERFIL</label><label className="indicador"></label></Dropdown.Item>
                                <Dropdown.Item className="item-dropdown senha">ALTERAR SENHA</Dropdown.Item>
                                <Dropdown.Item className="item-dropdown sair">SAIR <LogOut /></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;