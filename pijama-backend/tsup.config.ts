import {defineConfig} from 'tsup'

export default defineConfig ({
    entry: ['src'],  //define o diretório raiz
    format: ['esm'], //define o formato de saida dos arquivos
    outDir: 'build', //define em que diretorio serao criados os arquivos
    sourcemap: true, //debug
    shims: true,     //compatibilidade
    target: 'esnext',//versao alvo do js
})