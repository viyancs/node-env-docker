<script>
    import {differenceInSeconds, parseISO, format, addMinutes} from 'date-fns'
    import {store} from '../../auth/fireStore'
    const profile = store.profile;

	let user = $profile;
	let settings = user.settings;





    const formatDate = settings.amPmDateFormat ? "hh:mm" : "HH:mm"
    export let now = {};
    export let start = "08:30"
    export let end = "16:30"

    const startDate = format(new Date(), "yyyy-MM-dd") + " " + start + ":00"
    const endDate = format(new Date(), "yyyy-MM-dd") + " " + end + ":00"


    const startMinutes = Number(format(parseISO(startDate), "mm"))
    /* identifiy closes 0 or 30 minutes to start working time*/
    const startingMinuteObj = [
        {difference: (0 - startMinutes), minute: "00"},
        {difference: (30 - startMinutes), minute: "30"},
        {difference: (60 - startMinutes), minute: "00"}
    ].reduce((prev, curr) => {
        return prev.difference > curr.difference ? curr : prev
    }, {difference: 61})

    const startingMinute = startingMinuteObj['minute']

    const startHours = format(parseISO(startDate), "HH")
    const startingTime = format(new Date(), "yyyy-MM-dd") + " " + startHours + ":" + startingMinute + ":00"


    let container;
    let barEl
    let difference = Math.abs(differenceInSeconds(
        parseISO(startingTime),
        parseISO(endDate)
    ))
   
    const thirtyMinutes =  Math.floor(difference / (60 * 30))  + 2
    

    const endingTime = format(addMinutes(parseISO(startingTime), (0 + thirtyMinutes) * 30), "yyyy-MM-dd HH:mm:ss")
    let left = "0";

    now.subscribe((v) => {
        if (!container || !barEl) {
            return
        }
        const currentTime = format(v, "yyyy-MM-dd HH:mm:ss") 
        /* difference between starting point and current point in seconds */
        
        let differenceLower = differenceInSeconds(
            parseISO(currentTime),
            parseISO(startingTime)
        )
        /* difference between end point and current point in seconds */

        let differenceUpper = differenceInSeconds(
            parseISO(endDate),
            parseISO(currentTime)
        )

        /* we will convert from seconds to px */
        /* where each second is x% of the container rectangle */
        /* calculate difference between start point and end point */
        /* start time is 0px on rectangle and ending time is 100% px of the rectangle*/
        let difference = Math.abs(differenceInSeconds(
            parseISO(endingTime),
            parseISO(startingTime)
        ))


        if (differenceUpper < 0) {
            left= String(container.getBoundingClientRect().width) + "px"
            return 
        }
        if (differenceLower < 0) {
            left = "0px"
            return
        }

        const thirtiesInDifference = differenceLower / (30 * 60)
        let barWidth = barEl.getBoundingClientRect().width
        let calc =  thirtiesInDifference * barWidth + barWidth / 2

        const decimals = (Math.round(calc * 100) / 100).toFixed(2)
        left = String(decimals) + "px"
    })

</script>


<div bind:this={container} class="w-full h-full absolute flex justify-between px-8">
    <div style={"left:calc(" + left  +" + 2rem)"} class="absolute u-currenttime h-full w-0.5 bg-black"></div>
    {#each [...Array(thirtyMinutes + 1).keys()] as bar, i}
        <div bind:this={barEl} class="u-bar z-10 h-full w-full flex flex-col items-center">
            <div class="u-line h-full w-0.5 bg-gray-200"></div>
            <div class="u-time text-gray-300">
                {format(addMinutes(parseISO(startingTime), (0 + i) * 30), formatDate)}
            </div>
        </div>
    {/each}
</div>

<style>
    .u-time {
        line-height: 0.8;
        font-size: 12px;
    }
</style>
