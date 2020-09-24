export default {
    methods: {
        $errorNotify(type, title = '', text = '') {
            this.$notify({
                type: type,
                title: title,
                text: text
            })
        }
    }
}
