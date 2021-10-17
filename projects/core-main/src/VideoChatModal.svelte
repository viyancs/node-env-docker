<script>
    import {Modal, ModalBody} from 'sveltestrap'
    export let isOpen = false
</script>

<Modal {isOpen}>
    <ModalBody>
        <img src="/static/images/videochat.jpg" class="video-chat" />
    </ModalBody>
</Modal>
