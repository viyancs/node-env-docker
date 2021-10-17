<script>
	import Accordian from "./CustomAccordian.svelte";
	import AccordianBoxItem from "./AccordianBoxItem.svelte";
	import AccordianBox from "./AccordianBox.svelte";
</script>

<div class="custom-accordian-wrapper">
	<Accordian title="Notes" id="notes">
		<AccordianBox>
			<AccordianBoxItem>
				<div class="item">New Office Space</div>
				<div class="item-icon">
					<button class="icon-btn">
						<img src="/static/images/dots-menu.svg" alt="" />
					</button>
				</div>
			</AccordianBoxItem>

			<AccordianBoxItem>
				<div class="item">Notes from Feb 9 call with Jordan</div>
				<div class="item-icon">
					<button class="icon-btn">
						<img src="/static/images/dots-menu.svg" alt="" />
					</button>
				</div>
			</AccordianBoxItem>

			<AccordianBoxItem>
				<div class="item">Marketing plan</div>
				<div class="item-icon">
					<button class="icon-btn">
						<img src="/static/images/dots-menu.svg" alt="" />
					</button>
				</div>
			</AccordianBoxItem>
		</AccordianBox>
	</Accordian>

	<Accordian title="Recent Files" id="recent">
		<AccordianBox>
			<AccordianBoxItem>
				<div class="item">Tour Itinerary</div>
				<div class="item-icon">
					<button class="icon-btn">
						<img src="/static/images/dots-menu.svg" alt="" />
					</button>
				</div>
			</AccordianBoxItem>

			<AccordianBoxItem>
				<div class="item">Expense Reports</div>
				<div class="item-icon">
					<button class="icon-btn">
						<img src="/static/images/dots-menu.svg" alt="" />
					</button>
				</div>
			</AccordianBoxItem>

			<AccordianBoxItem>
				<div class="item">2020 overviews</div>
				<div class="item-icon">
					<button class="icon-btn">
						<img src="/static/images/dots-menu.svg" alt="" />
					</button>
				</div>
			</AccordianBoxItem>
			<AccordianBoxItem>
				<div class="item">TS Stage setup</div>
				<div class="item-icon">
					<button class="icon-btn">
						<img src="/static/images/dots-menu.svg" alt="" />
					</button>
				</div>
			</AccordianBoxItem>
		</AccordianBox>
	</Accordian>

	<Accordian title="Widget Store" id="widget">
		<AccordianBox>
			<AccordianBoxItem>
				<div class="item">
					<img
						src="/static/images/tasks-96.png"
						class="accordian-item-icon"
						alt=""
					/> Team Tasks
				</div>
				<div class="item-icon">
					<button class="icon-btn" js-add-panel="">
						<img src="/static/images/add-btn.svg" alt="" />
					</button>
				</div>
			</AccordianBoxItem>
			<AccordianBoxItem>
				<div class="item">
					<img src="/static/images/spotify-icon.svg" alt="" /> Spotify Player
				</div>
				<div class="item-icon">
					<button class="icon-btn">
						<img src="/static/images/add-btn.svg" alt="" />
					</button>
				</div>
			</AccordianBoxItem>
			<AccordianBoxItem>
				<div class="item">
					<img src="/static/images/spotify-icon.svg" alt="" /> Spotify Analytics
				</div>
				<div class="item-icon">
					<button class="icon-btn">
						<img src="/static/images/add-btn.svg" alt="" />
					</button>
				</div>
			</AccordianBoxItem>
			<AccordianBoxItem>
				<div class="item">
					<img src="/static/images/sound-cloud.svg" alt="" /> Soundcloud Player
				</div>
				<div class="item-icon">
					<button class="icon-btn">
						<img src="/static/images/add-btn.svg" alt="" />
					</button>
				</div>
			</AccordianBoxItem>
			<AccordianBoxItem>
				<div class="item">
					<img src="/static/images/sound-cloud.svg" alt="" /> Soundcloud Analytics
				</div>
				<div class="item-icon">
					<button class="icon-btn">
						<img src="/static/images/add-btn.svg" alt="" />
					</button>
				</div>
			</AccordianBoxItem>
		</AccordianBox>
	</Accordian>
</div>

<style lang="scss">
	@import '../style/vars';

	.custom-accordian-wrapper {
		overflow: auto;
		padding-bottom: 20px;

		&::-webkit-scrollbar {
			width: 3px;
		}
	}
</style>
