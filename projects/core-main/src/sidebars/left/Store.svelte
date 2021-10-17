<script>
	import { createEventDispatcher } from "svelte";

	import { CustomAccordion } from "../../accordion";
	const dispatch = createEventDispatcher();
</script>

<CustomAccordion title="Widget Store">
	<div class="acordian-body left-sidebar-accordian box-accordian">
		<div class="box-accordian-listing">
			<div
				class="box-accordian-item pointer-cursor"
				on:click={() => dispatch("teamClicked")}
			>
				<div class="item">
					<img
						src="/static/images/tasks-96.png"
						class="accordian-item-icon"
						alt=""
					/> Team Tasks
				</div>
				<div class="item-icon">
					<button class="icon-btn">
						<img src="/static/images/add-btn.svg" alt="" />
					</button>
				</div>
			</div>
			<div class="box-accordian-item">
				<div class="item">
					<img src="/static/images/spotify-icon.svg" alt="" /> Spotify Player
				</div>
				<div class="item-icon">
					<button class="icon-btn">
						<img src="/static/images/add-btn.svg" alt="" />
					</button>
				</div>
			</div>

			<div class="box-accordian-item">
				<div class="item">
					<img src="/static/images/spotify-icon.svg" alt="" /> Spotify Analytics
				</div>
				<div class="item-icon">
					<button class="icon-btn">
						<img src="/static/images/add-btn.svg" alt="" />
					</button>
				</div>
			</div>

			<div class="box-accordian-item">
				<div class="item">
					<img src="/static/images/sound-cloud.svg" alt="" /> Soundcloud Player
				</div>
				<div class="item-icon">
					<button class="icon-btn">
						<img src="/static/images/add-btn.svg" alt="" />
					</button>
				</div>
			</div>

			<div class="box-accordian-item">
				<div class="item">
					<img src="/static/images/sound-cloud.svg" alt="" /> Soundcloud Analytics
				</div>
				<div class="item-icon">
					<button class="icon-btn">
						<img src="/static/images/add-btn.svg" alt="" />
					</button>
				</div>
			</div>
		</div>
	</div>
</CustomAccordion>