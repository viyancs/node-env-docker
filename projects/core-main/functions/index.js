const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const adminAuth = admin.auth();
const adminDB = admin.firestore();

const axios = require('axios');

exports.signup = functions.https.onCall(async (data, _) => {
    const { email, password, firstName, lastName, orgId } = data;

    try {
        const user = await adminAuth.createUser({
            email,
            password,
        });
        await adminDB
            .collection("users")
            .doc(user.uid)
            .set({ email, firstName, lastName });
        functions.logger.info(user.uid);
        return user.uid;
    } catch (err) {
        functions.logger.error(err);
        return err;
    }
});

exports.prepareUserData = functions.https.onCall(async ({ uid, orgId }) => {
    if (uid && orgId) {
        // get user document from firestore
        const userDoc = adminDB.collection('users').doc(uid)
        const membership = await userDoc.collection('memberships').doc(orgId).get()
        const roomCollection = adminDB.collection('rooms')

        // Check if the the user is a member in the given organization
        if (!membership.exists) {
            // If is not
            // Create new membership

            // Get all users in the given organization
            const inOrgUsers = await adminDB.collection('users')
                .where('membershipsIds', 'array-contains', orgId)
                .where(admin.firestore.FieldPath.documentId(), '!=', uid)
                .get()

            // Create new room between the currentUser and the the member of the organization
            for (const user of inOrgUsers.docs) {
                // Check of there is already a room
                const membersIds = [userDoc.id, user.id]

                // Create a new room

                const date = new Date()

                const room = await roomCollection.add({
                    createdAt: +date,
                    modifiedAt: +date,
                    membersIds: membersIds,
                    orgId: orgId
                })

                // Create room members
                const membersCollection = room.collection('members')
                const userData = (await userDoc.get()).data()
                await Promise.all(membersIds.map(id => membersCollection.doc(id).set({
                    typing: false,
                    notifiable: true,
                    userId: id,
                    nickName: `${userData.firstName} ${userData.lastName}`
                })
                ))
            }

            // Create an organization membership
            await userDoc.collection('memberships').doc(orgId).set({
                orgId
            })
        }

        const oldMembershipsIds = new Set((await userDoc.get()).data()?.membershipsIds ?? [])
        oldMembershipsIds.add(orgId)
        await userDoc.set({ activeOrgId: orgId, membershipsIds: Array.from(oldMembershipsIds) }, { merge: true })

        // Migrate old data

        /* roomCollection.get().then(snapshot => {
            // Set an orgId to those rooms that doesn't have it
            snapshot.docChanges().forEach(room => {
                // If orgId is absent
                if (!room.doc.get('orgId')) {
                    // Set the orgId prop to the org id sent by the user
                    room.doc.ref.set({ orgId }, { merge: true })
                }
            })
        }) */

        return
    }

    throw new functions.https.HttpsError('not-found', 'User not found! make sure you sign up.')
})


exports.proxyLink = functions.https.onCall(async (data, context) => {
    const link = data.link
    let resp = await axios.get(link)
    return resp.data
});
