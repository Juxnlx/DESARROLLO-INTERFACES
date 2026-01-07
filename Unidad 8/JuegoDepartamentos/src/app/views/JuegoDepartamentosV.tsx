import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { container } from '../../core/container';
import { TYPES } from '../../core/types';
import { JuegoDepartamentosVM } from '../../presenter/viewmodels/JuegoDepartamentosVM';

/**
 * Vista principal del juego de adivinar departamentos.
 * Observer de MobX que se actualiza automáticamente ante cambios en el ViewModel.
 */
const JuegoDepartamentosV = observer(() => {
    const [viewModel] = useState<JuegoDepartamentosVM>(() => 
        container.get<JuegoDepartamentosVM>(TYPES.JuegoDepartamentosVM)
    );
    
    const [modalVisible, setModalVisible] = useState(false);
    const [personaSeleccionadaIndex, setPersonaSeleccionadaIndex] = useState<number | null>(null);

    useEffect(() => {
        cargarDatosIniciales();
    }, []);

    /**
     * Carga los datos iniciales del juego desde la API.
     */
    const cargarDatosIniciales = async () => {
        await viewModel.cargarDatosIniciales();
    };

    /**
     * Valida que todas las personas tengan departamento seleccionado y comprueba las respuestas.
     */
    const handleComprobar = async () => {
        const todasSeleccionadas = validarTodasSeleccionadas();
        
        if (!todasSeleccionadas) {
            Alert.alert('Atencion', 'Debes seleccionar un departamento para todas las personas antes de comprobar.');
            return;
        }

        await viewModel.validarRespuestas();
    };

    /**
     * Verifica que ninguna persona tenga idDepartamentoSeleccionado en 0.
     */
    const validarTodasSeleccionadas = (): boolean => {
        for (const persona of viewModel.listaPersonasConColor) {
            if (persona.idDepartamentoSeleccionado === 0) {
                return false;
            }
        }
        return true;
    };

    /**
     * Reinicia el juego limpiando selecciones y resultados.
     */
    const handleReiniciar = () => {
        viewModel.reiniciar();
    };

    /**
     * Abre el modal de selección para la persona en el índice especificado.
     */
    const abrirSelector = (index: number) => {
        setPersonaSeleccionadaIndex(index);
        setModalVisible(true);
    };

    /**
     * Actualiza la selección de departamento en el ViewModel y cierra el modal.
     */
    const seleccionarDepartamento = (idDepartamento: number) => {
        if (personaSeleccionadaIndex !== null) {
            viewModel.actualizarSeleccion(personaSeleccionadaIndex, idDepartamento);
        }
        setModalVisible(false);
        setPersonaSeleccionadaIndex(null);
    };

    /**
     * Obtiene el nombre del departamento o devuelve placeholder si no hay selección.
     */
    const obtenerNombreDepartamento = (idDepartamento: number, listaDepartamentos: any[]): string => {
        if (idDepartamento === 0) {
            return "Selecciona un departamento...";
        }
        const departamento = listaDepartamentos.find(d => d.id === idDepartamento);
        return departamento ? departamento.nombre : "Selecciona un departamento...";
    };

    /**
     * Renderiza cada tarjeta de persona con su color de fondo y selector de departamento.
     */
    const renderPersonaItem = ({ item, index }: { item: any; index: number }) => {
        return (
            <View style={[styles.personaItem, { backgroundColor: item.colorFondo }]}>
                <View style={styles.personaInfo}>
                    <Text style={styles.personaNombre}>{item.nombreCompleto}</Text>
                </View>
                
                <TouchableOpacity 
                    style={styles.selectorContainer}
                    onPress={() => abrirSelector(index)}
                >
                    <Text style={[
                        styles.selectorText,
                        item.idDepartamentoSeleccionado === 0 && styles.selectorPlaceholder
                    ]}>
                        {obtenerNombreDepartamento(item.idDepartamentoSeleccionado, item.listaDepartamentos)}
                    </Text>
                    <Text style={styles.selectorArrow}>▼</Text>
                </TouchableOpacity>
            </View>
        );
    };

    // Pantalla de carga
    if (viewModel.cargando && viewModel.listaPersonasConColor.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#34C759" />
                <Text style={styles.loadingText}>Cargando personas...</Text>
            </View>
        );
    }

    // Pantalla de error
    if (viewModel.mensajeError) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Error: {viewModel.mensajeError}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={cargarDatosIniciales}>
                    <Text style={styles.retryButtonText}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Pantalla de victoria
    if (viewModel.juegoCompletado) {
        return (
            <View style={styles.contenedorVictoria}>
                <Text style={styles.tituloVictoria}>🎉 ¡FELICITACIONES! 🎉</Text>
                <Text style={styles.mensajeVictoria}>¡Has acertado todos los departamentos!</Text>
                <Text style={styles.submensajeVictoria}>Excelente trabajo 👏</Text>
                <Text style={styles.resultadoVictoria}>
                    {viewModel.numeroAciertos}/{viewModel.listaPersonasConColor.length} aciertos
                </Text>
                <TouchableOpacity style={styles.botonNuevaPartida} onPress={handleReiniciar}>
                    <Text style={styles.textoBotonNuevaPartida}>🔄 Nueva Partida</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const personaActual = personaSeleccionadaIndex !== null 
        ? viewModel.listaPersonasConColor[personaSeleccionadaIndex] 
        : null;

    // Pantalla principal del juego
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>🎯 Adivina los Departamentos</Text>
                <Text style={styles.subtitle}>
                    Las personas del mismo departamento tienen el mismo color
                </Text>
                {viewModel.numeroAciertos !== null && !viewModel.juegoCompletado && (
                    <View style={styles.contenedorProgreso}>
                        <Text style={styles.textoProgreso}>
                            Aciertos: {viewModel.numeroAciertos}/{viewModel.listaPersonasConColor.length}
                        </Text>
                    </View>
                )}
            </View>

            <FlatList
                data={viewModel.listaPersonasConColor}
                renderItem={renderPersonaItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.comprobarButton} 
                    onPress={handleComprobar}
                    disabled={viewModel.cargando}
                >
                    {viewModel.cargando ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>Comprobar</Text>
                    )}
                </TouchableOpacity>

                {viewModel.numeroAciertos !== null && !viewModel.juegoCompletado && (
                    <TouchableOpacity style={styles.reiniciarButton} onPress={handleReiniciar}>
                        <Text style={styles.buttonText}>Reiniciar</Text>
                    </TouchableOpacity>
                )}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Selecciona un departamento</Text>
                            <TouchableOpacity 
                                onPress={() => setModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <ScrollView style={styles.modalScrollView}>
                            {personaActual?.listaDepartamentos.map((dept: any) => (
                                <TouchableOpacity
                                    key={dept.id}
                                    style={[
                                        styles.departamentoOption,
                                        personaActual.idDepartamentoSeleccionado === dept.id && styles.departamentoOptionSelected
                                    ]}
                                    onPress={() => seleccionarDepartamento(dept.id)}
                                >
                                    <Text style={[
                                        styles.departamentoOptionText,
                                        personaActual.idDepartamentoSeleccionado === dept.id && styles.departamentoOptionTextSelected
                                    ]}>
                                        {dept.nombre}
                                    </Text>
                                    {personaActual.idDepartamentoSeleccionado === dept.id && (
                                        <Text style={styles.checkMark}>✓</Text>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    centerContainer: {
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
    },
    textoBotonNuevaPartida: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#34C759',
    },
    header: {
        backgroundColor: '#34C759',
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.9,
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
    listContainer: {
        padding: 16,
    },
    personaItem: {
        marginBottom: 12,
        padding: 16,
        borderRadius: 8,
    },
    personaInfo: {
        marginBottom: 12,
    },
    personaNombre: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    selectorContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DDD',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectorText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    selectorPlaceholder: {
        color: '#999',
    },
    selectorArrow: {
        fontSize: 12,
        color: '#666',
        marginLeft: 8,
    },
    buttonContainer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    comprobarButton: {
        backgroundColor: '#34C759',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
    },
    reiniciarButton: {
        backgroundColor: '#FF9500',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: '#34C759',
        padding: 12,
        borderRadius: 8,
        paddingHorizontal: 24,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        width: '100%',
        maxWidth: 400,
        maxHeight: '80%',
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        padding: 4,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#666',
    },
    modalScrollView: {
        maxHeight: 400,
    },
    departamentoOption: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    departamentoOptionSelected: {
        backgroundColor: '#E5F5E5',
    },
    departamentoOptionText: {
        fontSize: 16,
        color: '#333',
    },
    departamentoOptionTextSelected: {
        color: '#34C759',
        fontWeight: '600',
    },
    checkMark: {
        fontSize: 20,
        color: '#34C759',
        fontWeight: 'bold',
    },
});

export default JuegoDepartamentosV;