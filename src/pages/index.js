import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronLeft, Paperclip, Printer, Search } from 'react-feather';
import DataTable, { defaultThemes } from 'react-data-table-component';

function Body() {

    //Colunas da tabela
    const columns = [
        {
            name: '',
            selector: 'id',
            omit: true
        },
        {
            name: 'Vencimento',
            selector: 'vencimento',
            sortable: true,
        },
        {
            name: 'Nome do Beneficiário',
            selector: 'nome',
            sortable: true,
        },
        {
            name: 'Valor',
            selector: 'valor',
            sortable: true,
            cell: row => <CustomValorCol row={row} />
        },
        {
            name: 'Situação',
            selector: 'situacao',
            sortable: true,
            cell: row => <CustomSituacaoCol row={row} />
        },
        {
            name: 'Opções',
            selector: 'Opções',
            cell: row => <CustomActionCol row={row} />
        },
    ];

    //Dados filtrados que serão exibidos nas tabelas
    const [filteredData, setFilteredData] = useState([])
    
    //texto do campo de busca
    const [searchText, setSearchText] = useState()
    
    //dados
    const [data, setData] = useState([
        {id: 0, vencimento: '15/12/2020', nome: 'João Henrique', valor: 1900.00, situacao: 1},
        {id: 0, vencimento: '16/12/2020', nome: 'Tiago Rocha', valor: 1800.00, situacao: 1},
        {id: 0, vencimento: '17/12/2020', nome: 'Walace Rodrigues', valor: 1100.00, situacao: 0},
        {id: 0, vencimento: '18/12/2020', nome: 'Junior Geyer', valor: 1300.00, situacao: 2},
        {id: 0, vencimento: '19/12/2020', nome: 'Jairo Alvez', valor: 1400.00, situacao: 1},
        {id: 0, vencimento: '20/12/2020', nome: 'Breno Fernandes', valor: 1800.00, situacao: 0},
        {id: 0, vencimento: '21/12/2020', nome: 'José Pereira', valor: 1100.00, situacao: 2},
        {id: 0, vencimento: '22/12/2020', nome: 'Fabricio Sales', valor: 1200.00, situacao: 2},
        {id: 0, vencimento: '23/12/2020', nome: 'Thiago Araújo', valor: 1300.00, situacao: 2},
        {id: 0, vencimento: '24/12/2020', nome: 'João Marques', valor: 1900.00, situacao: 0},
        {id: 0, vencimento: '25/12/2020', nome: 'Antônio Marcos', valor: 1700.00, situacao: 1},
        {id: 0, vencimento: '26/12/2020', nome: 'Radson Lourenço', valor: 1900.00, situacao: 2},
        {id: 0, vencimento: '27/12/2020', nome: 'João Victor', valor: 1000.00, situacao: 2},
        {id: 0, vencimento: '28/12/2020', nome: 'Marcos Antônio', valor: 1100.00, situacao: 0},
    ]);

    // Colunas customizadas
    const CustomActionCol = ({ row }) => (
        <div className="container-icons-options">
            <Printer size={17}/>
            <Paperclip size={17} style={{marginLeft: 5}}/>
        </div>
    );

    const CustomSituacaoCol = ({ row }) => (
        <div className="container-situacao">
            {
                row.situacao === 0 ? <div className="black">A Vencer</div> : 
                row.situacao === 1 ? <div className="red">Atrasado</div> : 
                <div className="green">Pago</div>
            }
        </div>
    );

    const CustomValorCol = ({ row }) => (
        <div className="container-valor">
            {row.valor.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2, style: 'currency',currency: 'BRL'})}
        </div>
    );

    //Estilização da tabela
    const customStyles = {
        header: {
          style: {
            minHeight: '56px',
          },
        },
        headRow: {
            style: {
              
              borderWidth: '0px !important',
            
              // borderTopColor: defaultThemes.default.divider.default,
            },
          },
        rows: {
          style: {
            borderColor: '#f24952 !important;',
            borderStyle: 'solid',
            borderWidth: '1px',
            // borderomWidth: '0px !important',
            paddingLeft: '25px',
            paddingRight: '25px',
            paddingTop: '10px',
            paddingBottom: '10px',
            marginBottom: '10px',
            borderRadius: '10px'
          },
        },
        cells: {
          style: {
            '&:not(:last-of-type)': {
              marginRight: '30px'
            },
            color: '#808080',
            textAlign: 'center'
          },
        },
        headCells: {
          style: {
            '&:not(:last-of-type)': {
              marginRight: '30px'
            },
            // color: '#8593A5'
            border: 'none'
          },
        },
    };

    //Estado que define a aba ativa da tabela
    const [activeTab, setActiveTab] = useState(0)

    useEffect( () => {
        setFilteredData(data);
    }, [])

    //Função que irá receber o texto digitado no input de pesquisa da tabela e irá realizar 
    //o filtro considerando o campo de nome
    function filterEmployees(filterText) {
        setSearchText(filterText)
        let dataTemp = data.filter(a => true);
        if (filterText && filterText.length > 2) {

            let filteredData = dataTemp.filter(a => {
                console.log(a);
                if ((a.nome && a.nome.toLowerCase().includes(filterText.toLowerCase()))) {
                    return true;
                } else {
                    return false;
                }
            });

            setFilteredData(filteredData);
        } else {
            setFilteredData(dataTemp);
        }
    }

    //Muda a aba ativa e filtra os dados de acordo com ela
    function changeActiveTab(tab) {
        console.log(tab);
        if (tab === 0) {
            setFilteredData(data.filter( a => ( a.nome && a.nome.toLowerCase().includes(searchText.toLowerCase()))  ))
        } else if(tab === 1){
            let dataTemp = data.filter(a => ( a.nome && a.nome.toLowerCase().includes(searchText.toLowerCase())));
            dataTemp = dataTemp.filter( a => a.situacao === 1);
            setFilteredData(dataTemp)
        }else{
            let dataTemp = data.filter(a => ( a.nome && a.nome.toLowerCase().includes(searchText.toLowerCase())));
            dataTemp = dataTemp.filter( a => a.situacao === 2);
            setFilteredData(dataTemp)
        }
        setActiveTab(tab)
    }

    return (
        <div className="body-table-container">
            <div className="body-table">
                <div className="row-table-actions">
                    <div className="row-table-actions-item">
                        <ChevronLeft size={20} />
                        <label>Voltar</label>
                    </div>
                </div>
                <div className="row-table-filter-container">
                    <div className="row-table-filter">
                        <h1>Relação de Cobranças Recebidas</h1>
                        <div className="row-table-filter">
                            <div className="table-filter-item">
                                <div className="search">
                                    <input placeholder="Buscar" value={searchText} onChange={ (e) => filterEmployees(e.target.value)}/>
                                    <Search size={15} />
                                </div>
                            </div>
                            <div className="table-filter-item">
                                <select>
                                    <option>7 dias</option>
                                    <option>14 dias</option>
                                    <option>30 dias</option>
                                </select>
                            </div>
                            <div className="table-filter-item">
                                <label>De</label>
                                <input type="date" />
                            </div>
                            <div className="table-filter-item">
                                <label>Até</label>
                                <input type="date" />
                            </div>
                        </div>
                    </div>
                    <div className="row-active-filter">
                        De 07/02/2021 Até 04/03/2021
                    </div>
                </div>
                <div className="container-table-tabs">
                    <div className="table-tabs">
                        <div onClick={ () => changeActiveTab(0)} className={activeTab === 0 ? "table-tabs-item active" : "table-tabs-item"}>Todas as cobranças</div>
                        <div onClick={ () => changeActiveTab(1)} className={activeTab === 1 ? "table-tabs-item active" : "table-tabs-item"}>Pendentes</div>
                        <div onClick={ () => changeActiveTab(2)} className={activeTab === 2 ? "table-tabs-item active" : "table-tabs-item"}>Pagas</div>
                    </div>
                </div>
                <div className="container-table">
                       <DataTable title=""
                        columns={columns}
                        data={filteredData}
                        customStyles={customStyles}
                        sortIcon={<ChevronDown color="#8593A5" size={8} />}
                        pagination
                        paginationComponentOptions={{ rowsPerPageText: "Registros por página", rangeSeparatorText: "de", selectAllRowsItemText: "Tudo" }}
                        noDataComponent="Nenhum registro para mostrar"
                        paginationPerPage={6}
                    />
                </div>
            </div>
        </div>
    )
}

export default Body;