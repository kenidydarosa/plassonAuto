import * as React from 'react';
import { TextInput } from 'react-native-paper';
import styleJS from './style';

/**
 * Componente `InputText` que exibe um campo de entrada de texto com suporte para ícones, 
 * visibilidade de senha e configurações personalizadas. 
 * Utiliza o componente `TextInput` do `react-native-paper` com funcionalidades extras.
 * 
 * @param {object} props - Propriedades passadas para o componente.
 * @param {string} props.label - Rótulo (label) do campo de entrada de texto.
 * @param {string} props.icon - Nome do ícone a ser exibido no campo de entrada.
 * @param {string} props.type - Tipo do campo de entrada (por exemplo, 'password' para senha).
 * @param {string} props.value - Valor atual do campo de entrada.
 * @param {function} props.setValue - Função para atualizar o valor do campo de entrada.
 * @param {string} [props.width='100%'] - Largura do campo de entrada (padrão é 100%).
 * @param {boolean} [props.multiline=false] - Se `true`, o campo se comporta como um campo de várias linhas (textarea).
 * 
 * @returns {React.Element} O componente `InputText` renderizando o campo de entrada com as funcionalidades descritas.
 */
const InputText = ({ label, icon, type, value, setValue, width = '100%', multiline = false }) => {
  // Estado para controlar o ícone exibido (exemplo: 'eye' ou 'eye-off' para senha)
  const [iconBt, setIconBt] = React.useState(icon);
  
  // Estado para controlar a visibilidade da senha (se o tipo for 'password', inicialmente estará como seguro)
  const [secureText, setSecureText] = React.useState(type === 'password');

  /**
   * Função que alterna a visibilidade da senha e altera o ícone.
   * Se o campo for do tipo 'password', o ícone muda entre 'eye' (mostrar senha) e 'eye-off' (ocultar senha).
   */
  const changeIcon = () => {
    if (type === 'password') {
      setSecureText(prev => !prev);  // Alterna a visibilidade da senha
      setIconBt(prev => (prev === 'eye' ? 'eye-off' : 'eye'));  // Alterna o ícone
    }
  };

  return (
    <TextInput
      // Rótulo do campo
      label={label}
      value={value} // Valor atual do campo
      onChangeText={setValue} // Função chamada ao mudar o texto no campo
      secureTextEntry={secureText}  // Se true, o campo será exibido como senha
      right={ 
        // Exibe o ícone à direita do campo de entrada
        <TextInput.Icon
          icon={iconBt} // Ícone de olho que alterna entre mostrar e ocultar a senha
          color={styleJS.primaryColor} // Cor do ícone
          size={20} // Tamanho do ícone
          onPress={changeIcon} // Alterna a visibilidade da senha quando pressionado
        />
      }
      outlineColor="#d9d9d9" // Cor da borda do campo
      selectionHandleColor={styleJS.primaryColor} // Cor da seleção do texto
      activeOutlineColor={styleJS.primaryColor} // Cor da borda ativa (quando o campo está selecionado)
      activeUnderlineColor={styleJS.primaryColor} // Cor da linha ativa (quando o campo está selecionado)
      multiline={multiline} // Se verdadeiro, o campo se torna uma área de texto (textarea)
      keyboardType="email-address" // Tipo de teclado (definido como 'email-address' por padrão)
      style={{
        backgroundColor: '#F8F8F8FF', // Cor de fundo do campo de entrada
        width: width, // Largura do campo de entrada
        marginVertical: 3, // Margem vertical entre os campos de entrada
      }}
    />
  );
};

export default InputText;

