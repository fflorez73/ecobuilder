// ============================================
//  SUPABASE.JS - SCHEMA: datanalytic
// ============================================

const SUPABASE_URL = 'https://TU_PROYECTO.supabase.co';
const SUPABASE_ANON_KEY = 'TU_ANON_KEY';
const SCHEMA = 'datanalytic';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function guardarProgresoCloud(usuarioId, nivel, puntaje) {
    try {
        const { error } = await supabaseClient
            .from(`${SCHEMA}.progreso`)
            .upsert([{ usuario_id: usuarioId, nivel, puntaje }], { onConflict: 'usuario_id' });

        if (error) throw error;
        console.log('✅ Guardado en datanalytic');
        return true;
    } catch (e) {
        console.error('❌ Error:', e.message);
        return false;
    }
}

async function cargarProgresoCloud(usuarioId) {
    try {
        const { data, error } = await supabaseClient
            .from(`${SCHEMA}.progreso`)
            .select('nivel, puntaje')
            .eq('usuario_id', usuarioId)
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return data || null;
    } catch (e) {
        console.error('❌ Error:', e.message);
        return null;
    }
}

function obtenerUsuarioId() {
    let id = localStorage.getItem('ecobuilder_usuario');
    if (!id) {
        id = 'user_' + Math.random().toString(36).substring(2, 10);
        localStorage.setItem('ecobuilder_usuario', id);
    }
    return id;
}