import { getStore } from "../auth/fireStore"
import {writable} from 'svelte/store'
export class MessageNotification {
    static currentMessages = {}
    static recentMessengers = {}
    static messengerTimeout = 10 /* seconds */
    static localNotification = true
    static NotificationStore = writable([])
    static async newMessages(rooms) {
        const profile = (getStore()).profile
        const wholeProfile = await new Promise((resolve, reject) => {
            profile.subscribe((v) => {
                resolve(v)
            })
        })

        const id = wholeProfile.id
        MessageNotification.localNotification = !wholeProfile.default.settings.desktopNotifications

        let diffed = {}
        
        for (const [roomID, room] of Object.entries(rooms)) {
            if (room.messages.length == 0) {
                continue
            }
            if (MessageNotification.currentMessages[roomID] == undefined) {
                MessageNotification.currentMessages[roomID] = room.messages.map((item) => item.id)
                continue
            }

            if (room.messages.length > MessageNotification.currentMessages[roomID].length) {
                /* we got an extra (new) message for this room */
                
                let diffedmessages = room.messages.filter((item) => {
                    let isFromSecondParty = item.default.userId != id
                    let isNewMessage = !MessageNotification.currentMessages[roomID]
                    .some((oldMessageid) => oldMessageid == item.id)
                    return isFromSecondParty && isNewMessage
                })
                diffed[roomID] = {...room, messages: diffedmessages}
            }

        }

        this.currentMessages = Object.fromEntries(
            Object.entries(rooms)
            .map(([roomID, room]) => [roomID, room.messages.map((item) => item.id)])
        )

        for (const [roomID, room] of Object.entries(diffed)) {
            if (room.messages.length == 0) {
                continue
            }
            
            
            if (!room?.users) {
                /* chat component is not initialized */
                continue
            }
            const sender = room.users.find((item) => item.id != id)
            console.log(sender)
            console.log(sender.fullName)
            const timeNow = (+new Date() / 1000)
            if (timeNow - (MessageNotification.recentMessengers[sender.id] || 0) > MessageNotification.messengerTimeout) {
                /* show in app notifications if window has focus, or notifications requested to be in app */
                if (MessageNotification.localNotification || !document.hidden) {

                    MessageNotification.NotificationStore.update((old) => {
                        return [
                            ...old,
                            {
                                id: diffed[roomID].messages[0].id,
                                name: sender.fullName,
                                text: diffed[roomID].messages[0].default.body,
                                img: sender
                            }
                        ]
                    })
                } else { /* if desktop enabled and document is hidden send desktop notifications */
                    const permission =  Notification.permission

                    if (permission == "default") {
                        await Notification.requestPermission()
                    }

                    if (permission == "default" || permission == "denied") {
                        return
                    }

                    const notification = new Notification(sender.fullName, {
                        body: diffed[roomID].messages[0].default.body,
                        badge : '/images/specta-icon.png',
                        icon: '/images/specta-icon.png',
                        image: '/images/specta-icon.png'
                    });
                }
                
                MessageNotification.recentMessengers[sender.id] = (+new Date() / 1000)
            }
            
        }
    }
}