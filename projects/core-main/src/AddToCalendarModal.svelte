<script>
    export let event
    export let invited
</script>

<div class="modal fade" id="addToCalendar" tabindex="-1" role="dialog" aria-hidden="true" js-event="{ event.id }">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                    Create Event
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="createEventWrapper">
                    <p>
                        <span class="modal-event-title">{ event.eventTitle }</span>
                        <span>
                            { event.start_fmt }
                            {#if event.end_fmt}
                                { event.end_fmt }
                            {/if}
                        </span>
                    </p>
                    <p>Also invite</p>
                    <div class="modal-also-invite">
                        {#each invited as user}
                            <div class="modal-invite-row">
                                <input type="checkbox" class="form-control modal-checkbox" name="user-{user.id}">
                                <label class="modal-label" for="user-{user.id}">{ user.first } { user.last } ({ user.role })</label>
                            </div>
                        {/each}
                    </div>
                    <input type="text" class="btn btn-primary" value="Add to calendar" />
                </div>
            </div>
        </div>
    </div>
</div>


<style>
    
</style>

