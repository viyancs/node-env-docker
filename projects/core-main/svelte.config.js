import preprocess from 'svelte-preprocess';

export default {
    compilerOptions: {
        dev: true,
    },
    preprocess: [preprocess({
        "postcss": true
    })]
}
