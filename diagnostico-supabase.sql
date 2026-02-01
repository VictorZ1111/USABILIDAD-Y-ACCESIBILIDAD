-- ============================================
-- SCRIPT PARA DIAGNOSTICAR BASE DE DATOS
-- Copia y pega esto en el SQL Editor de Supabase
-- ============================================

-- 1. Ver todas las tablas en el esquema public
SELECT 
    table_name,
    table_type
FROM 
    information_schema.tables
WHERE 
    table_schema = 'public'
ORDER BY 
    table_name;

-- 2. Ver estructura de la tabla diagnosticos (si existe)
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public'
    AND table_name = 'diagnosticos'
ORDER BY 
    ordinal_position;

-- 3. Ver todos los datos de la tabla diagnosticos
SELECT * FROM public.diagnosticos LIMIT 10;

-- 4. Contar cuántos diagnósticos hay
SELECT COUNT(*) as total_diagnosticos FROM public.diagnosticos;

-- 5. Ver usuarios de autenticación (solo funciona si tienes permisos)
SELECT 
    id,
    email,
    created_at,
    confirmed_at,
    last_sign_in_at
FROM 
    auth.users
ORDER BY 
    created_at DESC
LIMIT 10;

-- ============================================
-- INSTRUCCIONES:
-- 1. Ve a tu Dashboard de Supabase
-- 2. Abre SQL Editor
-- 3. Copia y pega TODO este archivo
-- 4. Haz clic en RUN
-- 5. Copia TODOS los resultados que aparezcan
-- 6. Pégalos en el chat para que pueda ayudarte
-- ============================================
