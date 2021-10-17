
<script>
    import {Avatar} from './components'
    import {MessageNotification} from './models/MessageNotification'
    let notifications = []
    const notificationDuration = 10000
    MessageNotification.NotificationStore.subscribe((v) => {
        /*new messages */
        const newMessages = v.filter((item) => !notifications.some((x) => x.id == item.id)  )
        for (const newMessage of newMessages) {
            setTimeout(() => {
                MessageNotification.NotificationStore.update((old) => old.filter((item) => item.id != newMessage.id))
            }, notificationDuration)
        }
        notifications = v
        
    })
</script>

<div class="u-overlay fixed top-3 w-full z-1000 pointer-events-none">

    <div class="u-notifications m-auto h-full flex flex-col">
        {#each notifications as notification (notification.id)}
            <div class="u-notification pointer-events-auto flex w-full flex-col mb-4 rounded-md overflow-hidden">
                <div class="u-main flex w-full">
                    <div class="u-information w-full flex items-center p-3">
                        <div class="u-image mr-4 w-11 h-11">
                            <Avatar user={notification.img} />
                        </div>
                        <div class="u-sender-text flex flex-col">
                            <div class="u-sender-name font-bold">
                                {notification.name}
                            </div>
                            <div class="u-sender-message">
                                {notification.text}
                            </div>
                        </div>
                    </div>
                    <div class="u-actions flex flex-col p-3 ">
                        <div class="u-dismiss m-auto text-sm cursor-pointer" on:click={() => {MessageNotification.NotificationStore.update((old) => old.filter((item) => item.id != notification.id))}} >
                            Dismiss
                        </div>
                    </div>
                </div>
                
            </div>
        {/each}
    </div>
</div>

<style>
    .u-overlay {
        height: 80vh;
        z-index: 1000;
    }
    .u-notifications {
        width: 380px; 
    }

    .u-notification {
        box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
    }
   
    .u-actions {
        border-left: 1px solid rgba(0,0,0,0.1);
    }

    .u-main {
        background: radial-gradient(100% 15097.66% at 0% 50%, #AACEDA 0%, #C9DDDC 34.38%, #C8D6CD 64.06%, #B6D0CD 100%);
    }

</style>
