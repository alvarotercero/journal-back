const poolSQL = require("../config/db.js");

const seleccionarNoticiaPorId = async (id) => {
    const [resultado] = await poolSQL.query(
        'select * from noticias where id = ?',
        [id]
    );
    return resultado;
}

const seleccionarNoticiasPorUsuario = async (id) => {
    const [resultado] = await poolSQL.query(
        'select * from noticias where redactor_id = ? or editor_id = ? order by fecha_publicacion desc',
        [id, id]
    );
    return resultado;
}

const seleccionarNoticiasPorSeccionCategoria = async (seccion, categoriaId) => {
    const [resultado] = await poolSQL.query(
        'select n.*, c.slug as slug_cat from noticias n join categoria c on n.categoria_id = c.id where n.secciones = ? and n.categoria_id = ? and n.estado = "publicado" order by n.fecha_publicacion desc',
        [seccion, categoriaId]
    );
    return resultado;
}

const seleccionarNoticiasPorSeccion = async (seccion) => {
    const [resultado] = await poolSQL.query(
        'select n.*, c.slug as slug_cat from noticias n join categoria c on n.categoria_id = c.id where n.secciones = ? and n.estado = "publicado" order by n.fecha_publicacion desc',
        [seccion]
    );
    return resultado;
}

const seleccionarNoticiaPorSlug = async (slug) => {
    const [resultado] = await poolSQL.query(
        'select n.*, c.slug as slug_cat from noticias n join categoria c on n.categoria_id = c.id where n.slug = ? and n.estado = "publicado" order by n.fecha_publicacion desc',
        [slug]
    );
    return resultado;
}

const seleccionarUltimasNoticias = async (numeroNoticias) => {
    const [resultado] = await poolSQL.query(
        'select n.*, c.slug as slug_cat from noticias n join categoria c on n.categoria_id = c.id where n.estado = "publicado" order by n.fecha_publicacion desc limit ?',
        [numeroNoticias]
    );
    return resultado;
}

const seleccionarNoticiasPorBusqueda = async (condiciones, palabras) => {
    const valores = palabras.flatMap(palabra => [palabra, palabra]);
    const [resultado] = await poolSQL.query(
        `select n.*, c.slug as slug_cat from noticias n join categoria c on n.categoria_id = c.id where estado = "publicado" and ${condiciones} order by fecha_publicacion desc`,
        valores
    );
    return resultado;
}

const insertarNoticia = async ({ titular, imagen, texto, secciones, fecha_publicacion, redactor_id, editor_id, categoria_id, estado, importancia, cambios, slug }) => {
    const [resultado] = await poolSQL.query(
        'insert into noticias (titular, imagen, texto, secciones, fecha_publicacion, redactor_id, editor_id, categoria_id, estado, importancia, cambios, slug) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [titular, imagen, texto, secciones, fecha_publicacion, redactor_id, editor_id, categoria_id, estado, importancia, cambios, slug]
    );
    if (resultado.affectedRows != 1) {
        return -1;
    }
    return resultado.insertId;
}

const actualizarNoticia = async (id, { titular, imagen, texto, secciones, fecha_publicacion, redactor_id, editor_id, categoria_id, estado, importancia, cambios, slug }) => {
    const [resultado] = await poolSQL.query(
        'update noticias set titular = ?, imagen = ?, texto = ?, secciones = ?, fecha_publicacion = ?, redactor_id = ?, editor_id = ?, categoria_id = ?, estado = ?, importancia = ?, cambios = ?, slug = ? where id = ?',
        [titular, imagen, texto, secciones, fecha_publicacion, redactor_id, editor_id, categoria_id, estado, importancia, cambios, slug, id]
    );
    return resultado.affectedRows;
}

const borrarNoticia = async (id) => {
    const [resultado] = await poolSQL.query(
        'delete from noticias where id = ?',
        [id]
    );
    return resultado.affectedRows;
}

module.exports = {
    seleccionarNoticiaPorId,
    seleccionarNoticiasPorUsuario,
    seleccionarNoticiasPorSeccionCategoria,
    seleccionarNoticiasPorSeccion,
    seleccionarNoticiaPorSlug,
    seleccionarUltimasNoticias,
    seleccionarNoticiasPorBusqueda,
    insertarNoticia,
    actualizarNoticia,
    borrarNoticia
};
