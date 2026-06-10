<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, KeyboardAvoidingView,
  Platform, Alert, Switch, Modal, FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ─── BANCO DE DADOS ───────────────────────────────────────
const DB = {
  usuarios: [
    { id: '1', nome: 'João Silva',     email: 'joao@email.com',   senha: '123456', perfil: 'cliente'   },
    { id: '2', nome: 'Maria Oliveira', email: 'maria@email.com',  senha: '123456', perfil: 'cliente'   },
    { id: '3', nome: 'Ana Costa',      email: 'ana@email.com',    senha: '123456', perfil: 'cliente'   },
    { id: '4', nome: 'Carlos Santos',  email: 'carlos@email.com', senha: '123456', perfil: 'motorista' },
    { id: '5', nome: 'Pedro Alves',    email: 'pedro@email.com',  senha: '123456', perfil: 'motorista' },
  ],
  buscarUsuario(email, senha, perfil) {
    return this.usuarios.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha && u.perfil === perfil
    ) || null;
  },
};

const C = {
  bg: '#0A0F1E', card: '#111827', border: '#1F2937',
  green: '#16A34A', white: '#FFFFFF', muted: '#9CA3AF',
  dim: '#6B7280', input: '#1F2937', inputBorder: '#374151',
  emerald: '#10B981', blue: '#3B82F6', red: '#EF4444', yellow: '#FBBF24',
};

// ─── LOGIN ────────────────────────────────────────────────
function LoginScreen({ navegar }) {
  const [perfil, setPerfil] = useState(null);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    setErro('');
    if (!perfil) return setErro('Selecione seu perfil.');
    if (!email || !senha) return setErro('Preencha e-mail e senha.');
    const usuario = DB.buscarUsuario(email, senha, perfil);
    if (!usuario) return setErro('E-mail, senha ou perfil incorretos.');
    navegar(usuario.perfil, usuario);
  };

  const preencherUsuario = (u) => {
    setEmail(u.email);
    setSenha('123456');
    setPerfil(u.perfil);
    setErro('');
  };

  return (
    <SafeAreaView style={l.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={l.scroll} keyboardShouldPersistTaps="handled">

          <View style={l.logoArea}>
            <View style={l.logoBox}>
              <Ionicons name="car-sport" size={36} color={C.green} />
            </View>
            <Text style={l.logoText}>Frete<Text style={{ color: C.green }}>Run</Text></Text>
            <Text style={l.logoSub}>Fretes e mudanças na palma da mão</Text>
          </View>

          <View style={l.dicaCard}>
            <Ionicons name="information-circle-outline" size={16} color={C.green} />
            <Text style={l.dicaText}>Toque em um usuário para preencher automaticamente</Text>
          </View>

          <Text style={l.secLabel}>Usuários de teste</Text>
          <View style={l.usuariosRow}>
            {DB.usuarios.map(u => (
              <TouchableOpacity key={u.id} style={l.usuarioChip} onPress={() => preencherUsuario(u)} activeOpacity={0.8}>
                <View style={[l.chipIcon, { backgroundColor: u.perfil === 'cliente' ? '#3B82F618' : '#16A34A18' }]}>
                  <Ionicons name={u.perfil === 'cliente' ? 'person' : 'car'} size={12} color={u.perfil === 'cliente' ? C.blue : C.green} />
                </View>
                <Text style={l.chipNome}>{u.nome.split(' ')[0]}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={l.secLabel}>Entrar como</Text>
          <View style={l.perfilRow}>
            {['cliente', 'motorista'].map(p => (
              <TouchableOpacity key={p} style={[l.perfilCard, perfil === p && l.perfilActive]} onPress={() => { setPerfil(p); setErro(''); }} activeOpacity={0.8}>
                <View style={[l.perfilIcon, perfil === p && l.perfilIconActive]}>
                  <Ionicons name={p === 'cliente' ? 'person' : 'car'} size={22} color={perfil === p ? C.bg : C.muted} />
                </View>
                <Text style={[l.perfilName, perfil === p && { color: C.white }]}>{p === 'cliente' ? 'Cliente' : 'Motorista'}</Text>
                <Text style={l.perfilDesc}>{p === 'cliente' ? 'Quero solicitar um frete' : 'Quero realizar fretes'}</Text>
                {perfil === p && <Ionicons name="checkmark-circle" size={16} color={C.green} style={l.check} />}
              </TouchableOpacity>
            ))}
          </View>

          <Text style={l.fieldLabel}>E-mail</Text>
          <View style={[l.inputRow, erro && { borderColor: C.red }]}>
            <Ionicons name="mail-outline" size={17} color={C.dim} style={{ marginRight: 8 }} />
            <TextInput style={l.input} placeholder="seu@email.com" placeholderTextColor={C.dim}
              value={email} onChangeText={t => { setEmail(t); setErro(''); }} keyboardType="email-address" autoCapitalize="none" />
          </View>

          <Text style={l.fieldLabel}>Senha</Text>
          <View style={[l.inputRow, erro && { borderColor: C.red }]}>
            <Ionicons name="lock-closed-outline" size={17} color={C.dim} style={{ marginRight: 8 }} />
            <TextInput style={[l.input, { flex: 1 }]} placeholder="••••••••" placeholderTextColor={C.dim}
              value={senha} onChangeText={t => { setSenha(t); setErro(''); }} secureTextEntry={!senhaVisivel} />
            <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
              <Ionicons name={senhaVisivel ? 'eye-off-outline' : 'eye-outline'} size={17} color={C.dim} />
            </TouchableOpacity>
          </View>

          {erro ? (
            <View style={l.erroRow}>
              <Ionicons name="alert-circle-outline" size={14} color={C.red} />
              <Text style={l.erroText}>{erro}</Text>
            </View>
          ) : null}

          <TouchableOpacity style={l.btnLogin} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={l.btnLoginText}>Entrar</Text>
            <Ionicons name="arrow-forward" size={17} color="#fff" />
          </TouchableOpacity>

          <View style={l.divider}>
            <View style={l.divLine} /><Text style={l.divText}>ou</Text><View style={l.divLine} />
          </View>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <Text style={l.registerText}>Não tem conta? <Text style={{ color: C.green, fontWeight: '600' }}>Cadastre-se</Text></Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const l = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 40 },
  logoArea: { alignItems: 'center', marginBottom: 24 },
  logoBox: { width: 72, height: 72, borderRadius: 20, backgroundColor: '#16A34A18', borderWidth: 1, borderColor: '#16A34A30', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  logoText: { fontSize: 32, fontWeight: '800', color: C.white, letterSpacing: -0.5 },
  logoSub: { fontSize: 13, color: C.muted, marginTop: 4 },
  dicaCard: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#16A34A12', borderRadius: 10, borderWidth: 1, borderColor: '#16A34A30', padding: 10, marginBottom: 16 },
  dicaText: { fontSize: 12, color: C.muted, flex: 1 },
  secLabel: { fontSize: 12, color: C.muted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 },
  usuariosRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  usuarioChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.card, borderRadius: 20, borderWidth: 1, borderColor: C.border, paddingHorizontal: 12, paddingVertical: 7 },
  chipIcon: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  chipNome: { fontSize: 12, color: C.muted, fontWeight: '500' },
  perfilRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  perfilCard: { flex: 1, backgroundColor: C.card, borderRadius: 16, borderWidth: 1.5, borderColor: C.border, padding: 14, alignItems: 'center' },
  perfilActive: { borderColor: C.green, backgroundColor: '#16A34A10' },
  perfilIcon: { width: 46, height: 46, borderRadius: 23, backgroundColor: C.input, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  perfilIconActive: { backgroundColor: C.green },
  perfilName: { fontSize: 14, fontWeight: '700', color: C.muted, marginBottom: 3 },
  perfilDesc: { fontSize: 10, color: C.dim, textAlign: 'center', lineHeight: 14 },
  check: { position: 'absolute', top: 8, right: 8 },
  fieldLabel: { fontSize: 12, color: C.muted, fontWeight: '500', marginBottom: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.input, borderRadius: 12, borderWidth: 1, borderColor: C.inputBorder, paddingHorizontal: 14, height: 50, marginBottom: 16 },
  input: { flex: 1, color: C.white, fontSize: 14 },
  erroRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: -10, marginBottom: 12 },
  erroText: { fontSize: 12, color: C.red },
  btnLogin: { backgroundColor: C.green, borderRadius: 14, height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnLoginText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 24 },
  divLine: { flex: 1, height: 1, backgroundColor: C.border },
  divText: { fontSize: 12, color: C.dim },
  registerText: { fontSize: 14, color: C.muted },
});

// ─── CHAT MODAL ───────────────────────────────────────────
function ChatModal({ visivel, fechar, nomeOutro }) {
  const [msg, setMsg] = useState('');
  const [msgs, setMsgs] = useState([
    { id: '1', texto: 'Olá! Estou a caminho.', meu: false, hora: '21:01' },
    { id: '2', texto: 'Ok! Te aguardo na entrada.', meu: true, hora: '21:02' },
  ]);

  const enviar = () => {
    if (!msg.trim()) return;
    const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setMsgs(prev => [...prev, { id: Date.now().toString(), texto: msg.trim(), meu: true, hora }]);
    setMsg('');
    setTimeout(() => {
      setMsgs(prev => [...prev, { id: (Date.now()+1).toString(), texto: 'Entendido! Já estou chegando.', meu: false, hora }]);
    }, 1000);
  };

  return (
    <Modal visible={visivel} animationType="slide" transparent>
      <View style={ch.overlay}>
        <View style={ch.container}>
          <View style={ch.header}>
            <View style={ch.headerLeft}>
              <View style={ch.avatar}><Text style={ch.avatarText}>{nomeOutro[0]}</Text></View>
              <View>
                <Text style={ch.nome}>{nomeOutro}</Text>
                <Text style={ch.online}>● Online</Text>
              </View>
            </View>
            <TouchableOpacity onPress={fechar}>
              <Ionicons name="close" size={24} color={C.muted} />
            </TouchableOpacity>
          </View>

          <ScrollView style={ch.msgs} contentContainerStyle={{ padding: 16, gap: 10 }}>
            {msgs.map(m => (
              <View key={m.id} style={[ch.bubble, m.meu ? ch.bubbleMeu : ch.bubbleDele]}>
                <Text style={[ch.bubbleText, m.meu && { color: '#fff' }]}>{m.texto}</Text>
                <Text style={[ch.bubbleHora, m.meu && { color: '#ffffff88' }]}>{m.hora}</Text>
              </View>
            ))}
          </ScrollView>

          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={ch.inputRow}>
              <TextInput style={ch.input} placeholder="Digite uma mensagem..." placeholderTextColor={C.dim}
                value={msg} onChangeText={setMsg} />
              <TouchableOpacity style={ch.sendBtn} onPress={enviar}>
                <Ionicons name="send" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
}

const ch = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#000000aa', justifyContent: 'flex-end' },
  container: { backgroundColor: C.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, height: '80%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: C.border },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: C.green, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  nome: { fontSize: 15, fontWeight: '700', color: C.white },
  online: { fontSize: 11, color: C.emerald, marginTop: 2 },
  msgs: { flex: 1 },
  bubble: { maxWidth: '78%', borderRadius: 14, padding: 10 },
  bubbleMeu: { backgroundColor: C.green, alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  bubbleDele: { backgroundColor: C.card, alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: 14, color: C.white },
  bubbleHora: { fontSize: 10, color: C.dim, marginTop: 4, textAlign: 'right' },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 16, borderTopWidth: 1, borderTopColor: C.border },
  input: { flex: 1, backgroundColor: C.card, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10, color: C.white, fontSize: 14 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: C.green, alignItems: 'center', justifyContent: 'center' },
});

// ─── AVALIAÇÃO MODAL ──────────────────────────────────────
function AvaliacaoModal({ visivel, fechar, nomeMotorista }) {
  const [estrelas, setEstrelas] = useState(0);
  const [comentario, setComentario] = useState('');

  const enviarAvaliacao = () => {
    if (estrelas === 0) return Alert.alert('Atenção', 'Selecione uma avaliação.');
    Alert.alert('Obrigado!', `Avaliação de ${estrelas} estrelas enviada para ${nomeMotorista}.`, [{ text: 'OK', onPress: fechar }]);
  };

  return (
    <Modal visible={visivel} animationType="slide" transparent>
      <View style={av.overlay}>
        <View style={av.container}>
          <Text style={av.titulo}>Avaliar motorista</Text>
          <View style={av.avatar}>
            <Text style={av.avatarText}>{nomeMotorista[0]}</Text>
          </View>
          <Text style={av.nome}>{nomeMotorista}</Text>
          <Text style={av.sub}>Como foi sua experiência?</Text>

          <View style={av.estrelasRow}>
            {[1,2,3,4,5].map(i => (
              <TouchableOpacity key={i} onPress={() => setEstrelas(i)}>
                <Ionicons name={i <= estrelas ? 'star' : 'star-outline'} size={36} color={C.yellow} />
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={av.input}
            placeholder="Deixe um comentário (opcional)"
            placeholderTextColor={C.dim}
            value={comentario}
            onChangeText={setComentario}
            multiline
            numberOfLines={3}
          />

          <TouchableOpacity style={av.btnEnviar} onPress={enviarAvaliacao}>
            <Text style={av.btnEnviarText}>Enviar avaliação</Text>
          </TouchableOpacity>
          <TouchableOpacity style={av.btnCancelar} onPress={fechar}>
            <Text style={av.btnCancelarText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const av = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#000000aa', justifyContent: 'flex-end' },
  container: { backgroundColor: C.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, alignItems: 'center' },
  titulo: { fontSize: 18, fontWeight: '800', color: C.white, marginBottom: 16 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: C.green, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  avatarText: { color: '#fff', fontWeight: '800', fontSize: 28 },
  nome: { fontSize: 16, fontWeight: '700', color: C.white, marginBottom: 4 },
  sub: { fontSize: 13, color: C.muted, marginBottom: 20 },
  estrelasRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  input: { width: '100%', backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 12, color: C.white, fontSize: 14, marginBottom: 16, textAlignVertical: 'top' },
  btnEnviar: { width: '100%', backgroundColor: C.green, borderRadius: 14, height: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  btnEnviarText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  btnCancelar: { width: '100%', alignItems: 'center', paddingVertical: 12 },
  btnCancelarText: { color: C.dim, fontSize: 14 },
});

// ─── RASTREAMENTO MODAL ───────────────────────────────────
function RastreamentoModal({ visivel, fechar }) {
  const [progresso, setProgresso] = useState(0);
  const [status, setStatus] = useState('Buscando motorista...');
  const [mostrarAvaliacao, setMostrarAvaliacao] = useState(false);

  const statusList = [
    'Buscando motorista...',
    'Motorista encontrado! Carlos Santos',
    'Motorista a caminho da coleta',
    'Carga coletada — em rota',
    'Chegando ao destino...',
    'Frete concluído! ✅',
  ];

  useEffect(() => {
    if (!visivel) { setProgresso(0); setStatus(statusList[0]); return; }
    const interval = setInterval(() => {
      setProgresso(p => {
        const novo = p + 1;
        if (novo < statusList.length) setStatus(statusList[novo]);
        if (novo >= statusList.length - 1) {
          clearInterval(interval);
          setTimeout(() => setMostrarAvaliacao(true), 1000);
        }
        return novo >= statusList.length ? statusList.length - 1 : novo;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [visivel]);

  const pct = (progresso / (statusList.length - 1)) * 100;

  return (
    <>
      <Modal visible={visivel} animationType="slide" transparent>
        <View style={rt.overlay}>
          <View style={rt.container}>
            <View style={rt.header}>
              <Text style={rt.titulo}>Rastreamento em tempo real</Text>
              <TouchableOpacity onPress={fechar}>
                <Ionicons name="close" size={22} color={C.muted} />
              </TouchableOpacity>
            </View>

            <View style={rt.mapa}>
              <Ionicons name="map" size={48} color={C.green} style={{ opacity: 0.3 }} />
              <View style={rt.mapaPin}>
                <Ionicons name="car-sport" size={24} color={C.green} />
              </View>
              <Text style={rt.mapaText}>Mapa simulado</Text>
            </View>

            <View style={rt.barraContainer}>
              <View style={[rt.barra, { width: `${pct}%` }]} />
            </View>

            <View style={rt.statusCard}>
              <View style={rt.statusDot} />
              <Text style={rt.statusText}>{status}</Text>
            </View>

            <View style={rt.etapas}>
              {statusList.map((s, i) => (
                <View key={i} style={rt.etapa}>
                  <View style={[rt.etapaDot, i <= progresso && rt.etapaDotAtiva]} />
                  <Text style={[rt.etapaText, i <= progresso && { color: C.white }]}>{s}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
      <AvaliacaoModal visivel={mostrarAvaliacao} fechar={() => { setMostrarAvaliacao(false); fechar(); }} nomeMotorista="Carlos Santos" />
    </>
  );
}

const rt = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#000000aa', justifyContent: 'flex-end' },
  container: { backgroundColor: C.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '90%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  titulo: { fontSize: 16, fontWeight: '800', color: C.white },
  mapa: { backgroundColor: C.card, borderRadius: 16, height: 140, alignItems: 'center', justifyContent: 'center', marginBottom: 16, borderWidth: 1, borderColor: C.border },
  mapaPin: { position: 'absolute', top: '40%', left: '50%' },
  mapaText: { fontSize: 12, color: C.dim, marginTop: 8 },
  barraContainer: { height: 6, backgroundColor: C.card, borderRadius: 3, marginBottom: 12, overflow: 'hidden' },
  barra: { height: 6, backgroundColor: C.green, borderRadius: 3 },
  statusCard: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#16A34A18', borderRadius: 10, padding: 12, marginBottom: 16 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.green },
  statusText: { fontSize: 13, color: C.white, fontWeight: '600', flex: 1 },
  etapas: { gap: 10 },
  etapa: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  etapaDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.border },
  etapaDotAtiva: { backgroundColor: C.green },
  etapaText: { fontSize: 12, color: C.dim },
});

// ─── CLIENTE DASHBOARD ────────────────────────────────────
const tipos = [
  { id: 'mudanca', icon: 'home-outline', label: 'Mudança', preco: 280 },
  { id: 'carga', icon: 'cube-outline', label: 'Carga', preco: 190 },
  { id: 'pequenos', icon: 'bag-outline', label: 'Pequenos', preco: 85 },
  { id: 'especial', icon: 'star-outline', label: 'Especial', preco: 350 },
];

function ClienteDashboard({ usuario, navegar }) {
  const nome = usuario?.nome || 'Cliente';
  const [tipo, setTipo] = useState(null);
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [chatVisivel, setChatVisivel] = useState(false);
  const [rastreioVisivel, setRastreioVisivel] = useState(false);
  const [freteAtivo, setFreteAtivo] = useState(false);

  const valorEstimado = tipo ? tipos.find(t => t.id === tipo)?.preco : null;

  const solicitar = () => {
    if (!tipo || !origem || !destino) return Alert.alert('Atenção', 'Preencha todos os campos.');
    const tipoSelecionado = tipos.find(t => t.id === tipo);
    navegar('aguardando', usuario, {
      tipo: tipoSelecionado?.label,
      preco: tipoSelecionado?.preco,
      origem,
      destino,
    });
  };

  return (
    <SafeAreaView style={cd.safe}>
      <ScrollView contentContainerStyle={cd.scroll} showsVerticalScrollIndicator={false}>

        <View style={cd.header}>
          <View>
            <Text style={cd.greeting}>Olá, {nome.split(' ')[0]} 👋</Text>
            <Text style={cd.greetingSub}>Para onde vai o seu frete?</Text>
          </View>
          <View style={cd.headerRight}>
            <TouchableOpacity style={cd.chatBtn} onPress={() => setChatVisivel(true)}>
              <Ionicons name="chatbubble-ellipses" size={20} color={C.green} />
            </TouchableOpacity>
            <View style={cd.avatar}><Text style={cd.avatarText}>{nome[0]}</Text></View>
          </View>
        </View>

        {freteAtivo && (
          <TouchableOpacity style={cd.rastreioCard} onPress={() => setRastreioVisivel(true)} activeOpacity={0.85}>
            <View style={cd.rastreioLeft}>
              <View style={cd.rastreioDot} />
              <Text style={cd.rastreioText}>Frete em andamento — toque para rastrear</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={C.green} />
          </TouchableOpacity>
        )}

        <View style={cd.card}>
          <View style={cd.cardHeader}>
            <Ionicons name="flash" size={16} color={C.green} />
            <Text style={cd.cardTitle}>Novo frete</Text>
          </View>

          <Text style={cd.fieldLabel}>Tipo de frete</Text>
          <View style={cd.tiposRow}>
            {tipos.map(t => (
              <TouchableOpacity key={t.id} style={[cd.tipoBtn, tipo === t.id && cd.tipoBtnActive]} onPress={() => setTipo(t.id)} activeOpacity={0.8}>
                <Ionicons name={t.icon} size={18} color={tipo === t.id ? C.green : C.dim} />
                <Text style={[cd.tipoBtnText, tipo === t.id && { color: C.green }]}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {valorEstimado && (
            <View style={cd.estimativaCard}>
              <Ionicons name="cash-outline" size={16} color={C.green} />
              <Text style={cd.estimativaText}>Valor estimado: <Text style={{ color: C.white, fontWeight: '700' }}>R$ {valorEstimado},00</Text></Text>
            </View>
          )}

          <Text style={cd.fieldLabel}>Origem</Text>
          <View style={cd.inputRow}>
            <View style={cd.dotGreen} />
            <TextInput style={cd.input} placeholder="Endereço de coleta" placeholderTextColor={C.dim} value={origem} onChangeText={setOrigem} />
            <Ionicons name="locate-outline" size={16} color={C.green} />
          </View>
          <View style={cd.routeLine} />

          <Text style={cd.fieldLabel}>Destino</Text>
          <View style={cd.inputRow}>
            <View style={cd.dotEmerald} />
            <TextInput style={cd.input} placeholder="Endereço de entrega" placeholderTextColor={C.dim} value={destino} onChangeText={setDestino} />
            <Ionicons name="search-outline" size={16} color={C.dim} />
          </View>

          <TouchableOpacity style={cd.btnSolicitar} onPress={solicitar} activeOpacity={0.85}>
            <Ionicons name="car-sport" size={16} color="#fff" />
            <Text style={cd.btnSolicitarText}>Solicitar motorista</Text>
          </TouchableOpacity>
        </View>

        <View style={cd.statsRow}>
          {[['12', 'Fretes'], ['4.9 ⭐', 'Avaliação'], ['R$1.4k', 'Total']].map(([v, lb]) => (
            <View key={lb} style={cd.statCard}>
              <Text style={cd.statVal}>{v}</Text>
              <Text style={cd.statLabel}>{lb}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={cd.logoutBtn} onPress={() => navegar('login')}>
          <Ionicons name="log-out-outline" size={15} color={C.dim} />
          <Text style={cd.logoutText}>Sair da conta</Text>
        </TouchableOpacity>

      </ScrollView>

      <ChatModal visivel={chatVisivel} fechar={() => setChatVisivel(false)} nomeOutro="Carlos Santos" />
      <RastreamentoModal visivel={rastreioVisivel} fechar={() => setRastreioVisivel(false)} />
    </SafeAreaView>
  );
}

const cd = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  greeting: { fontSize: 22, fontWeight: '800', color: C.white },
  greetingSub: { fontSize: 12, color: C.muted, marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  chatBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#16A34A18', alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: C.green, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  rastreioCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#16A34A18', borderRadius: 12, borderWidth: 1, borderColor: '#16A34A40', padding: 14, marginBottom: 14 },
  rastreioLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  rastreioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.green },
  rastreioText: { fontSize: 13, color: C.white, fontWeight: '500', flex: 1 },
  card: { backgroundColor: C.card, borderRadius: 20, borderWidth: 1, borderColor: C.border, padding: 16, marginBottom: 16 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: C.white },
  fieldLabel: { fontSize: 11, color: C.muted, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
  tiposRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  tipoBtn: { flex: 1, backgroundColor: C.input, borderRadius: 10, borderWidth: 1, borderColor: C.inputBorder, alignItems: 'center', paddingVertical: 9, gap: 3 },
  tipoBtnActive: { borderColor: C.green, backgroundColor: '#16A34A12' },
  tipoBtnText: { fontSize: 9, color: C.dim, fontWeight: '500' },
  estimativaCard: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#16A34A12', borderRadius: 10, padding: 10, marginBottom: 14 },
  estimativaText: { fontSize: 13, color: C.muted },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.input, borderRadius: 10, borderWidth: 1, borderColor: C.inputBorder, paddingHorizontal: 12, height: 46, gap: 8, marginBottom: 4 },
  dotGreen: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.green },
  dotEmerald: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.emerald },
  input: { flex: 1, color: C.white, fontSize: 13 },
  routeLine: { width: 1.5, height: 8, backgroundColor: C.border, marginLeft: 15 },
  btnSolicitar: { backgroundColor: C.green, borderRadius: 12, height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 14 },
  btnSolicitarText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 22 },
  statCard: { flex: 1, backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 12, alignItems: 'center' },
  statVal: { fontSize: 15, fontWeight: '800', color: C.white, marginBottom: 3 },
  statLabel: { fontSize: 9, color: C.dim },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8, paddingVertical: 12 },
  logoutText: { fontSize: 13, color: C.dim },
});

// ─── DETALHES CORRIDA MODAL ───────────────────────────────
function DetalhesCorrida({ corrida, fechar, onAceitar }) {
  return (
    <Modal visible={!!corrida} animationType="slide" transparent>
      <View style={dc.overlay}>
        <View style={dc.container}>
          <View style={dc.header}>
            <Text style={dc.titulo}>Detalhes do frete</Text>
            <TouchableOpacity onPress={fechar}><Ionicons name="close" size={22} color={C.muted} /></TouchableOpacity>
          </View>
          {corrida && <>
            <View style={dc.clienteRow}>
              <View style={dc.avatar}><Text style={dc.avatarText}>{corrida.cliente[0]}</Text></View>
              <View>
                <Text style={dc.clienteNome}>{corrida.cliente}</Text>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  {[1,2,3,4,5].map(i => <Ionicons key={i} name={i <= Math.floor(corrida.avaliacao) ? 'star' : 'star-outline'} size={12} color={C.yellow} />)}
                  <Text style={dc.rating}>{corrida.avaliacao}</Text>
                </View>
              </View>
              <View style={dc.valor}><Text style={dc.valorText}>{corrida.valor}</Text></View>
            </View>

            {[
              { icon: 'cube-outline', label: 'Tipo', valor: corrida.tipo },
              { icon: 'navigate-outline', label: 'Distância', valor: corrida.distancia },
              { icon: 'time-outline', label: 'Tempo estimado', valor: corrida.tempo },
              { icon: 'scale-outline', label: 'Peso estimado', valor: corrida.peso },
            ].map(item => (
              <View key={item.label} style={dc.infoRow}>
                <Ionicons name={item.icon} size={16} color={C.green} />
                <Text style={dc.infoLabel}>{item.label}</Text>
                <Text style={dc.infoValor}>{item.valor}</Text>
              </View>
            ))}

            <View style={dc.rotaCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: C.emerald }} />
                <Text style={dc.rotaText}>{corrida.origem}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Ionicons name="location" size={10} color={C.green} />
                <Text style={dc.rotaText}>{corrida.destino}</Text>
              </View>
            </View>

            <View style={dc.acoes}>
              <TouchableOpacity style={dc.btnRecusar} onPress={fechar}>
                <Text style={dc.btnRecusarText}>Recusar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={dc.btnAceitar} onPress={() => { onAceitar(corrida); fechar(); }}>
                <Ionicons name="checkmark" size={18} color="#fff" />
                <Text style={dc.btnAceitarText}>Aceitar frete</Text>
              </TouchableOpacity>
            </View>
          </>}
        </View>
      </View>
    </Modal>
  );
}

const dc = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#000000aa', justifyContent: 'flex-end' },
  container: { backgroundColor: C.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  titulo: { fontSize: 16, fontWeight: '800', color: C.white },
  clienteRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16, backgroundColor: C.card, borderRadius: 14, padding: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#3B82F618', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: C.blue, fontWeight: '700', fontSize: 18 },
  clienteNome: { fontSize: 14, fontWeight: '700', color: C.white, marginBottom: 4 },
  rating: { fontSize: 11, color: C.muted, marginLeft: 4 },
  valor: { marginLeft: 'auto' },
  valorText: { fontSize: 20, fontWeight: '800', color: C.green },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.border },
  infoLabel: { fontSize: 13, color: C.muted, flex: 1 },
  infoValor: { fontSize: 13, color: C.white, fontWeight: '600' },
  rotaCard: { backgroundColor: C.card, borderRadius: 12, padding: 14, marginTop: 12, marginBottom: 16 },
  rotaText: { fontSize: 12, color: C.muted, flex: 1 },
  acoes: { flexDirection: 'row', gap: 10 },
  btnRecusar: { flex: 1, borderWidth: 1, borderColor: C.border, borderRadius: 12, height: 48, alignItems: 'center', justifyContent: 'center' },
  btnRecusarText: { color: C.muted, fontWeight: '600' },
  btnAceitar: { flex: 2, backgroundColor: C.green, borderRadius: 12, height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  btnAceitarText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});

// ─── MOTORISTA DASHBOARD ──────────────────────────────────
const corridasDB = [
  { id: '1', cliente: 'Mariana Costa', tipo: 'Mudança', origem: 'Rua Augusta, 850 - SP', destino: 'Av. Rebouças, 1200 - SP', distancia: '3.2 km', tempo: '~12 min', valor: 'R$ 320,00', peso: '~200 kg', avaliacao: '4.8' },
  { id: '2', cliente: 'Roberto Alves', tipo: 'Carga', origem: 'CEAGESP - Vila Leopoldina', destino: 'Mercado Bom Preço - Pinheiros', distancia: '7.5 km', tempo: '~22 min', valor: 'R$ 190,00', peso: '~500 kg', avaliacao: '4.6' },
  { id: '3', cliente: 'Fernanda Lima', tipo: 'Pequenos', origem: 'Shopping Ibirapuera', destino: 'R. Domingos de Morais, 500', distancia: '1.8 km', tempo: '~8 min', valor: 'R$ 85,00', peso: '~20 kg', avaliacao: '5.0' },
];

const ganhosDia = [
  { id: '1', cliente: 'Ana Costa', tipo: 'Mudança', valor: 'R$ 280,00', hora: '09:30' },
  { id: '2', cliente: 'Paulo Lima', tipo: 'Carga', valor: 'R$ 190,00', hora: '12:15' },
  { id: '3', cliente: 'Sofia Mendes', tipo: 'Pequenos', valor: 'R$ 85,00', hora: '15:45' },
  { id: '4', cliente: 'Lucas Rocha', tipo: 'Especial', valor: 'R$ 350,00', hora: '18:20' },
];

function MotoristaDashboard({ usuario, navegar }) {
  const nome = usuario?.nome || 'Motorista';
  const [online, setOnline] = useState(true);
  const [corridaSelecionada, setCorridaSelecionada] = useState(null);
  const [chatVisivel, setChatVisivel] = useState(false);
  const [chatCliente, setChatCliente] = useState('');
  const [abaAtiva, setAbaAtiva] = useState('corridas');

  const aceitar = (c) => Alert.alert('✅ Corrida aceita!', `Dirija até:\n${c.origem}`, [{ text: 'Iniciar' }]);

  return (
    <SafeAreaView style={md.safe}>
      <ScrollView contentContainerStyle={md.scroll} showsVerticalScrollIndicator={false}>

        <View style={md.header}>
          <View>
            <Text style={md.greeting}>Olá, {nome.split(' ')[0]} 🚛</Text>
            <View style={md.onlineRow}>
              <View style={[md.onlineDot, { backgroundColor: online ? C.emerald : C.red }]} />
              <Text style={[md.onlineText, { color: online ? C.emerald : C.red }]}>{online ? 'Online' : 'Offline'}</Text>
            </View>
          </View>
          <View style={md.headerRight}>
            <Switch value={online} onValueChange={setOnline} trackColor={{ false: '#374151', true: '#16A34A40' }} thumbColor={online ? C.green : C.dim} ios_backgroundColor="#374151" />
            <View style={md.avatar}><Text style={md.avatarText}>{nome[0]}</Text></View>
          </View>
        </View>

        <View style={md.resumoCard}>
          <Text style={md.resumoTitle}>Resumo de hoje</Text>
          <View style={md.resumoRow}>
            {[
              { icon: 'checkmark-circle', color: C.emerald, val: '4', label: 'Corridas' },
              { icon: 'cash', color: C.green, val: 'R$905', label: 'Ganhos' },
              { icon: 'star', color: C.yellow, val: '4.9', label: 'Avaliação' },
              { icon: 'navigate', color: C.blue, val: '38km', label: 'Rodados' },
            ].map((item, i, arr) => (
              <React.Fragment key={item.label}>
                <View style={md.resumoItem}>
                  <Ionicons name={item.icon} size={18} color={item.color} />
                  <Text style={md.resumoVal}>{item.val}</Text>
                  <Text style={md.resumoLabel}>{item.label}</Text>
                </View>
                {i < arr.length - 1 && <View style={md.resumoSep} />}
              </React.Fragment>
            ))}
          </View>
        </View>

        <View style={md.abas}>
          {[['corridas', 'Fretes disponíveis'], ['ganhos', 'Ganhos do dia']].map(([id, label]) => (
            <TouchableOpacity key={id} style={[md.aba, abaAtiva === id && md.abaAtiva]} onPress={() => setAbaAtiva(id)}>
              <Text style={[md.abaText, abaAtiva === id && md.abaTextAtiva]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {abaAtiva === 'corridas' && (
          online ? corridasDB.map(c => (
            <View key={c.id} style={md.corridaCard}>
              <View style={md.corridaTopo}>
                <View style={md.clienteRow}>
                  <View style={md.clienteAvatar}><Text style={md.clienteAvatarText}>{c.cliente[0]}</Text></View>
                  <View>
                    <Text style={md.clienteNome}>{c.cliente}</Text>
                    <View style={md.ratingRow}>
                      <Ionicons name="star" size={10} color={C.yellow} />
                      <Text style={md.ratingText}>{c.avaliacao}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={md.corridaValor}>{c.valor}</Text>
                  <View style={md.tipoTag}><Text style={md.tipoTagText}>{c.tipo}</Text></View>
                </View>
              </View>

              <View style={md.metaRow}>
                {[{ icon: 'navigate-outline', val: c.distancia }, { icon: 'time-outline', val: c.tempo }, { icon: 'scale-outline', val: c.peso }].map(m => (
                  <View key={m.val} style={md.metaItem}>
                    <Ionicons name={m.icon} size={12} color={C.dim} />
                    <Text style={md.metaText}>{m.val}</Text>
                  </View>
                ))}
              </View>

              <View style={md.acoesRow}>
                <TouchableOpacity style={md.btnDetalhes} onPress={() => setCorridaSelecionada(c)} activeOpacity={0.8}>
                  <Ionicons name="information-circle-outline" size={16} color={C.green} />
                  <Text style={md.btnDetalhesText}>Detalhes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={md.btnChat} onPress={() => { setChatCliente(c.cliente); setChatVisivel(true); }} activeOpacity={0.8}>
                  <Ionicons name="chatbubble-ellipses-outline" size={16} color={C.blue} />
                  <Text style={md.btnChatText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={md.btnAceitar} onPress={() => aceitar(c)} activeOpacity={0.85}>
                  <Ionicons name="checkmark" size={16} color="#fff" />
                  <Text style={md.btnAceitarText}>Aceitar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )) : (
            <View style={md.offlineMsg}>
              <Ionicons name="moon-outline" size={36} color={C.dim} />
              <Text style={md.offlineTxt}>Você está offline</Text>
              <Text style={md.offlineSub}>Ative o modo online para receber fretes</Text>
            </View>
          )
        )}

        {abaAtiva === 'ganhos' && (
          <View>
            <View style={md.ganhosTotalCard}>
              <Text style={md.ganhosTotalLabel}>Total hoje</Text>
              <Text style={md.ganhosTotalValor}>R$ 905,00</Text>
              <Text style={md.ganhosMeta}>Meta: R$ 1.000,00 — falta R$ 95,00</Text>
              <View style={md.metaBarraContainer}>
                <View style={[md.metaBarra, { width: '90%' }]} />
              </View>
            </View>
            {ganhosDia.map(g => (
              <View key={g.id} style={md.ganhoCard}>
                <View style={md.ganhoLeft}>
                  <View style={md.ganhoIcone}><Ionicons name="cube-outline" size={16} color={C.green} /></View>
                  <View>
                    <Text style={md.ganhoCliente}>{g.cliente}</Text>
                    <Text style={md.ganhoTipo}>{g.tipo} · {g.hora}</Text>
                  </View>
                </View>
                <Text style={md.ganhoValor}>{g.valor}</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity style={md.logoutBtn} onPress={() => navegar('login')}>
          <Ionicons name="log-out-outline" size={15} color={C.dim} />
          <Text style={md.logoutText}>Sair da conta</Text>
        </TouchableOpacity>

      </ScrollView>

      <DetalhesCorrida corrida={corridaSelecionada} fechar={() => setCorridaSelecionada(null)} onAceitar={aceitar} />
      <ChatModal visivel={chatVisivel} fechar={() => setChatVisivel(false)} nomeOutro={chatCliente} />
    </SafeAreaView>
  );
}

const md = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { fontSize: 22, fontWeight: '800', color: C.white },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  onlineDot: { width: 7, height: 7, borderRadius: 4 },
  onlineText: { fontSize: 12, fontWeight: '600' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: C.green, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  resumoCard: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 16 },
  resumoTitle: { fontSize: 12, color: C.muted, marginBottom: 12, fontWeight: '500' },
  resumoRow: { flexDirection: 'row', alignItems: 'center' },
  resumoItem: { flex: 1, alignItems: 'center', gap: 3 },
  resumoVal: { fontSize: 14, fontWeight: '800', color: C.white },
  resumoLabel: { fontSize: 9, color: C.dim },
  resumoSep: { width: 1, height: 32, backgroundColor: C.border },
  abas: { flexDirection: 'row', backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 4, marginBottom: 16 },
  aba: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 9 },
  abaAtiva: { backgroundColor: C.green },
  abaText: { fontSize: 12, color: C.dim, fontWeight: '600' },
  abaTextAtiva: { color: '#fff' },
  corridaCard: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 12 },
  corridaTopo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  clienteRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  clienteAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#3B82F618', alignItems: 'center', justifyContent: 'center' },
  clienteAvatarText: { color: C.blue, fontWeight: '700', fontSize: 14 },
  clienteNome: { fontSize: 13, fontWeight: '700', color: C.white },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  ratingText: { fontSize: 10, color: C.muted },
  corridaValor: { fontSize: 16, fontWeight: '800', color: C.green },
  tipoTag: { backgroundColor: '#16A34A14', borderRadius: 5, paddingHorizontal: 7, paddingVertical: 2, marginTop: 3 },
  tipoTagText: { fontSize: 9, color: C.green, fontWeight: '600' },
  metaRow: { flexDirection: 'row', gap: 14, marginBottom: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11, color: C.dim },
  acoesRow: { flexDirection: 'row', gap: 8 },
  btnDetalhes: { flex: 1, borderWidth: 1, borderColor: '#16A34A40', borderRadius: 10, height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: '#16A34A10' },
  btnDetalhesText: { color: C.green, fontWeight: '600', fontSize: 12 },
  btnChat: { flex: 1, borderWidth: 1, borderColor: '#3B82F640', borderRadius: 10, height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: '#3B82F610' },
  btnChatText: { color: C.blue, fontWeight: '600', fontSize: 12 },
  btnAceitar: { flex: 1.5, backgroundColor: C.green, borderRadius: 10, height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 },
  btnAceitarText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  offlineMsg: { alignItems: 'center', paddingVertical: 48, gap: 8 },
  offlineTxt: { fontSize: 17, fontWeight: '700', color: C.muted },
  offlineSub: { fontSize: 12, color: C.dim, textAlign: 'center' },
  ganhosTotalCard: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 16, marginBottom: 12 },
  ganhosTotalLabel: { fontSize: 12, color: C.muted, marginBottom: 4 },
  ganhosTotalValor: { fontSize: 28, fontWeight: '800', color: C.green, marginBottom: 6 },
  ganhosMeta: { fontSize: 11, color: C.muted, marginBottom: 8 },
  metaBarraContainer: { height: 6, backgroundColor: C.input, borderRadius: 3, overflow: 'hidden' },
  metaBarra: { height: 6, backgroundColor: C.green, borderRadius: 3 },
  ganhoCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 12, marginBottom: 8 },
  ganhoLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  ganhoIcone: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#16A34A18', alignItems: 'center', justifyContent: 'center' },
  ganhoCliente: { fontSize: 13, fontWeight: '700', color: C.white },
  ganhoTipo: { fontSize: 11, color: C.muted, marginTop: 2 },
  ganhoValor: { fontSize: 15, fontWeight: '800', color: C.green },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 24, paddingVertical: 12 },
  logoutText: { fontSize: 13, color: C.dim },
});

// ─── AGUARDANDO MOTORISTA ─────────────────────────────────
function AguardandoMotorista({ frete, usuario, navegar }) {
  const [etapa, setEtapa] = useState(0);
  const [chatVisivel, setChatVisivel] = useState(false);
  const [avaliacaoVisivel, setAvaliacaoVisivel] = useState(false);

  const etapas = [
    { icone: 'search', texto: 'Buscando motorista...', cor: C.blue },
    { icone: 'person-add', texto: 'Motorista encontrado!', cor: C.green },
    { icone: 'car', texto: 'Motorista a caminho da coleta', cor: C.green },
    { icone: 'cube', texto: 'Carga coletada — em rota', cor: C.yellow },
    { icone: 'navigate', texto: 'Chegando ao destino...', cor: C.yellow },
    { icone: 'checkmark-circle', texto: 'Frete concluído! ✅', cor: C.emerald },
  ];

  const motorista = { nome: 'Carlos Santos', veiculo: 'Fiat Fiorino', placa: 'ABC-1234', avaliacao: '4.9', foto: 'C' };

  useEffect(() => {
    if (etapa >= etapas.length - 1) return;
    const timer = setTimeout(() => setEtapa(e => e + 1), 3000);
    return () => clearTimeout(timer);
  }, [etapa]);

  const concluido = etapa === etapas.length - 1;
  const pct = (etapa / (etapas.length - 1)) * 100;

  return (
    <SafeAreaView style={ag.safe}>
      <ScrollView contentContainerStyle={ag.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={ag.header}>
          <TouchableOpacity style={ag.backBtn} onPress={() => navegar('cliente', usuario)}>
            <Ionicons name="arrow-back" size={20} color={C.white} />
          </TouchableOpacity>
          <Text style={ag.headerTitle}>Acompanhar frete</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Status principal */}
        <View style={ag.statusCard}>
          <View style={[ag.statusIcone, { backgroundColor: etapas[etapa].cor + '22' }]}>
            <Ionicons name={etapas[etapa].icone} size={32} color={etapas[etapa].cor} />
          </View>
          <Text style={ag.statusTexto}>{etapas[etapa].texto}</Text>

          {/* Barra de progresso */}
          <View style={ag.barraContainer}>
            <View style={[ag.barra, { width: `${pct}%`, backgroundColor: etapas[etapa].cor }]} />
          </View>
          <Text style={ag.barraLabel}>Etapa {etapa + 1} de {etapas.length}</Text>
        </View>

        {/* Card do motorista */}
        {etapa >= 1 && (
          <View style={ag.motoristaCard}>
            <View style={ag.motoristaHeader}>
              <View style={ag.motoristaAvatar}>
                <Text style={ag.motoristaAvatarText}>{motorista.foto}</Text>
              </View>
              <View style={ag.motoristaInfo}>
                <Text style={ag.motoristaNome}>{motorista.nome}</Text>
                <View style={ag.ratingRow}>
                  <Ionicons name="star" size={12} color={C.yellow} />
                  <Text style={ag.ratingText}>{motorista.avaliacao}</Text>
                </View>
                <Text style={ag.motoristaVeiculo}>{motorista.veiculo} · {motorista.placa}</Text>
              </View>
              <TouchableOpacity style={ag.chatBtn} onPress={() => setChatVisivel(true)}>
                <Ionicons name="chatbubble-ellipses" size={20} color={C.green} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Mapa simulado */}
        <View style={ag.mapaCard}>
          <View style={ag.mapaInner}>
            <Ionicons name="map" size={40} color={C.green} style={{ opacity: 0.3 }} />
            {etapa >= 1 && (
              <View style={ag.mapaCarrinho}>
                <Ionicons name="car-sport" size={28} color={C.green} />
              </View>
            )}
            <Text style={ag.mapaTexto}>Mapa em tempo real</Text>
          </View>
        </View>

        {/* Detalhes do frete */}
        <View style={ag.detalhesCard}>
          <Text style={ag.detalhesTitle}>Detalhes do frete</Text>
          {[
            { icone: 'cube-outline', label: 'Tipo', valor: frete?.tipo || 'Mudança' },
            { icone: 'cash-outline', label: 'Valor', valor: `R$ ${frete?.preco || 280},00` },
          ].map(item => (
            <View key={item.label} style={ag.detalheRow}>
              <Ionicons name={item.icone} size={15} color={C.green} />
              <Text style={ag.detalheLabel}>{item.label}</Text>
              <Text style={ag.detalheValor}>{item.valor}</Text>
            </View>
          ))}
          <View style={ag.detalheRow}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: C.emerald }} />
            <Text style={ag.detalheLabel}>Origem</Text>
            <Text style={[ag.detalheValor, { flex: 1, textAlign: 'right' }]} numberOfLines={1}>{frete?.origem || 'Av. Paulista, 1000'}</Text>
          </View>
          <View style={ag.detalheRow}>
            <Ionicons name="location" size={10} color={C.green} />
            <Text style={ag.detalheLabel}>Destino</Text>
            <Text style={[ag.detalheValor, { flex: 1, textAlign: 'right' }]} numberOfLines={1}>{frete?.destino || 'R. Consolação, 300'}</Text>
          </View>
        </View>

        {/* Etapas */}
        <View style={ag.etapasCard}>
          <Text style={ag.etapasTitle}>Histórico</Text>
          {etapas.slice(0, etapa + 1).map((e, i) => (
            <View key={i} style={ag.etapaRow}>
              <View style={[ag.etapaDot, { backgroundColor: e.cor }]} />
              <Text style={ag.etapaTexto}>{e.texto}</Text>
              <Ionicons name="checkmark-circle" size={14} color={e.cor} />
            </View>
          ))}
        </View>

        {/* Botão cancelar ou avaliar */}
        {!concluido ? (
          <TouchableOpacity style={ag.btnCancelar} onPress={() => Alert.alert('Cancelar frete?', '', [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim, cancelar', style: 'destructive', onPress: () => navegar('cliente', usuario) },
          ])}>
            <Ionicons name="close-circle-outline" size={16} color={C.red} />
            <Text style={ag.btnCancelarText}>Cancelar frete</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={ag.btnAvaliar} onPress={() => setAvaliacaoVisivel(true)}>
            <Ionicons name="star" size={16} color="#fff" />
            <Text style={ag.btnAvaliarText}>Avaliar motorista</Text>
          </TouchableOpacity>
        )}

      </ScrollView>

      <ChatModal visivel={chatVisivel} fechar={() => setChatVisivel(false)} nomeOutro={motorista.nome} />
      <AvaliacaoModal visivel={avaliacaoVisivel} fechar={() => { setAvaliacaoVisivel(false); navegar('cliente', usuario); }} nomeMotorista={motorista.nome} />
    </SafeAreaView>
  );
}

const ag = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.card, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: C.white },
  statusCard: { backgroundColor: C.card, borderRadius: 20, borderWidth: 1, borderColor: C.border, padding: 20, alignItems: 'center', marginBottom: 16 },
  statusIcone: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  statusTexto: { fontSize: 16, fontWeight: '700', color: C.white, marginBottom: 16, textAlign: 'center' },
  barraContainer: { width: '100%', height: 6, backgroundColor: C.input, borderRadius: 3, overflow: 'hidden', marginBottom: 8 },
  barra: { height: 6, borderRadius: 3 },
  barraLabel: { fontSize: 11, color: C.muted },
  motoristaCard: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 16 },
  motoristaHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  motoristaAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: C.green, alignItems: 'center', justifyContent: 'center' },
  motoristaAvatarText: { color: '#fff', fontWeight: '800', fontSize: 20 },
  motoristaInfo: { flex: 1 },
  motoristaNome: { fontSize: 15, fontWeight: '700', color: C.white },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginVertical: 2 },
  ratingText: { fontSize: 12, color: C.muted },
  motoristaVeiculo: { fontSize: 11, color: C.dim },
  chatBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#16A34A18', alignItems: 'center', justifyContent: 'center' },
  mapaCard: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, marginBottom: 16, overflow: 'hidden' },
  mapaInner: { height: 160, alignItems: 'center', justifyContent: 'center' },
  mapaCarrinho: { position: 'absolute' },
  mapaTexto: { fontSize: 12, color: C.dim, marginTop: 8 },
  detalhesCard: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 16 },
  detalhesTitle: { fontSize: 13, fontWeight: '700', color: C.white, marginBottom: 12 },
  detalheRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: C.border },
  detalheLabel: { fontSize: 12, color: C.muted, flex: 1 },
  detalheValor: { fontSize: 12, color: C.white, fontWeight: '600' },
  etapasCard: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 16 },
  etapasTitle: { fontSize: 13, fontWeight: '700', color: C.white, marginBottom: 12 },
  etapaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  etapaDot: { width: 8, height: 8, borderRadius: 4 },
  etapaTexto: { flex: 1, fontSize: 12, color: C.muted },
  btnCancelar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#EF444410', borderWidth: 1, borderColor: '#EF444430', borderRadius: 14, height: 50 },
  btnCancelarText: { color: C.red, fontWeight: '600', fontSize: 14 },
  btnAvaliar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: C.green, borderRadius: 14, height: 50 },
  btnAvaliarText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});

// ─── APP ──────────────────────────────────────────────────
export default function App() {
  const [tela, setTela] = useState('login');
  const [usuario, setUsuario] = useState({});
  const [freteData, setFreteData] = useState({});
  const navegar = (destino, dados = {}, frete = {}) => {
    setUsuario(dados);
    setFreteData(frete);
    setTela(destino);
  };
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      {tela === 'login'      && <LoginScreen navegar={navegar} />}
      {tela === 'cliente'    && <ClienteDashboard usuario={usuario} navegar={navegar} />}
      {tela === 'motorista'  && <MotoristaDashboard usuario={usuario} navegar={navegar} />}
      {tela === 'aguardando' && <AguardandoMotorista frete={freteData} usuario={usuario} navegar={navegar} />}
    </View>
  );
}
=======
import { StyleSheet, Text, View } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Change code in the editor and watch it change on your phone! Save to get a shareable url.
      </Text>
      <Card>
        <AssetExample />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
>>>>>>> ee0af424613f126b2ceb131531ed26ab818bcf46
