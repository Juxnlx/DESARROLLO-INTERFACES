import { Picker } from '@react-native-picker/picker';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { container } from '../../core/container';
import { TYPES } from '../../core/types';
import { JuegoDepartamentosVM } from '../../presenter/viewmodels/JuegoDepartamentosVM';

const JuegoDepartamentosV = observer(() => {
    const [viewModel] = useState<JuegoDepartamentosVM>(() => 
        container.get<JuegoDepartamentosVM>(TYPES.JuegoDepartamentosVM)
    );

    useEffect(() => {
        inicializarDatos();
    }, []);

    const inicializarDatos = async () => {
        await viewModel.cargarDatosIniciales();
    };

    const manejarComprobar = async () => {
        const todasTienenSeleccion = verificarSeleccionCompleta();
        
        if (!todasTienenSeleccion) {
            Alert.alert(
                'Atencion',
                'Debes seleccionar un departamento para cada persona antes de comprobar.'
            );
            return;
        }

        await viewModel.validarRespuestas();
    };

    const verificarSeleccionCompleta = () => {
        for (const persona of viewModel.listaPersonasConColor) {
            if (persona.idDepartamentoSeleccionado === 0) {
                return false;
            }
        }
        return true;
    };

    const manejarReiniciar = () => {
        viewModel.reiniciar();
    };

    const renderizarItemPersona = ({ item, index }: any) => {
        return (
            <View style={[styles.tarjetaPersona, { backgroundColor: item.colorFondo }]}>
                <View style={styles.contenedorInfo}>
                    <Text style={styles.textoNombre}>
                        {item.nombreCompleto}
                    </Text>
                </View>
                
                <View style={styles.contenedorPicker}>
                    <Picker
                        selectedValue={item.idDepartamentoSeleccionado}
                        style={styles.selector}
                        onValueChange={(valor: string | number) => {
                            const valorNumerico = typeof valor === 'string' ? parseInt(valor, 10) : valor;
                            viewModel.actualizarSeleccion(index, valorNumerico);
                        }}
                    >
                        <Picker.Item label="Selecciona departamento..." value={0} />
                        {item.listaDepartamentos.map((dept: any) => (
                            <Picker.Item 
                                key={dept.id} 
                                label={dept.nombre} 
                                value={dept.id} 
                            />
                        ))}
                    </Picker>
                </View>
            </View>
        );
    };

    if (viewModel.cargando && viewModel.listaPersonasConColor.length === 0) {
        return (
            <View style={styles.contenedorCentrado}>
                <ActivityIndicator size="large" color="#34C759" />
                <Text style={styles.textoCargando}>Cargando datos...</Text>
            </View>
        );
    }

    if (viewModel.mensajeError) {
        return (
            <View style={styles.contenedorCentrado}>
                <Text style={styles.textoError}>Error: {viewModel.mensajeError}</Text>
                <TouchableOpacity style={styles.botonReintentar} onPress={inicializarDatos}>
                    <Text style={styles.textoBotonReintentar}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (viewModel.juegoCompletado) {
        return (
            <View style={styles.contenedorVictoria}>
                <Text style={styles.tituloVictoria}>🎉 ¡FELICITACIONES! 🎉</Text>
                <Text style={styles.mensajeVictoria}>
                    ¡Has acertado todos los departamentos!
                </Text>
                <Text style={styles.submensajeVictoria}>
                    Excelente trabajo 👏
                </Text>
                <Text style={styles.resultadoVictoria}>
                    {viewModel.numeroAciertos}/{viewModel.listaPersonasConColor.length} aciertos
                </Text>
                <TouchableOpacity 
                    style={styles.botonNuevaPartida} 
                    onPress={manejarReiniciar}
                >
                    <Text style={styles.textoBotonNuevaPartida}>🔄 Nueva Partida</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.contenedor}>
            <View style={styles.encabezado}>
                <Text style={styles.titulo}>Adivina los Departamentos</Text>
                <Text style={styles.subtitulo}>
                    Personas del mismo departamento tienen el mismo color de fondo
                </Text>
                {viewModel.numeroAciertos !== null && (
                    <View style={styles.contenedorProgreso}>
                        <Text style={styles.textoProgreso}>
                            Aciertos: {viewModel.numeroAciertos}/{viewModel.listaPersonasConColor.length}
                        </Text>
                    </View>
                )}
            </View>

            <FlatList
                data={viewModel.listaPersonasConColor}
                renderItem={renderizarItemPersona}
                keyExtractor={(item: any, index: number) => index.toString()}
                contentContainerStyle={styles.contenedorLista}
            />

            <View style={styles.contenedorBotones}>
                <TouchableOpacity 
                    style={styles.botonComprobar} 
                    onPress={manejarComprobar}
                    disabled={viewModel.cargando}
                >
                    {viewModel.cargando ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.textoBoton}>Comprobar</Text>
                    )}
                </TouchableOpacity>

                {viewModel.numeroAciertos !== null && !viewModel.juegoCompletado && (
                    <TouchableOpacity 
                        style={styles.botonReiniciar} 
                        onPress={manejarReiniciar}
                    >
                        <Text style={styles.textoBoton}>Reiniciar Juego</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    contenedorCentrado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    contenedorVictoria: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#34C759',
        padding: 40,
    },
    tituloVictoria: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
        textAlign: 'center',
    },
    mensajeVictoria: {
        fontSize: 24,
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: '600',
    },
    submensajeVictoria: {
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 30,
        textAlign: 'center',
        opacity: 0.9,
    },
    resultadoVictoria: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 20,
        borderRadius: 15,
    },
    botonNuevaPartida: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    textoBotonNuevaPartida: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#34C759',
    },
    encabezado: {
        backgroundColor: '#34C759',
        padding: 20,
        paddingTop: 60,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitulo: {
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.9,
        textAlign: 'center',
    },
    contenedorProgreso: {
        marginTop: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 10,
        borderRadius: 8,
    },
    textoProgreso: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    contenedorLista: {
        padding: 16,
    },
    tarjetaPersona: {
        marginBottom: 12,
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    contenedorInfo: {
        marginBottom: 12,
    },
    textoNombre: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    contenedorPicker: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    selector: {
        height: 50,
    },
    contenedorBotones: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    botonComprobar: {
        backgroundColor: '#34C759',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
    },
    botonReiniciar: {
        backgroundColor: '#FF9500',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    textoBoton: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textoCargando: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    textoError: {
        fontSize: 16,
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: 16,
    },
    botonReintentar: {
        backgroundColor: '#34C759',
        padding: 12,
        borderRadius: 8,
        paddingHorizontal: 24,
    },
    textoBotonReintentar: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default JuegoDepartamentosV;