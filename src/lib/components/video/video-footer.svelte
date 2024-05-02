<script lang="ts">
	import Icon from "$lib/components/shared-components/icon.svelte";
	import { Avatar } from "@skeletonlabs/skeleton";


</script>

<div class='videoFooter'>
    <div class='videoFooter_text'>
        <Avatar initials="df"/>
        <h3>
            Hello .<button>Follow</button>
        </h3>
    </div>
    <div class='videoFooter_ticker'>
    </div>
    <div class='videoFooter_actions'> 
        <div class='videoFooter_actionsLeft'>
            <Icon iconName="arrow-right"/>
            <Icon iconName="arrow-right"/>
            <Icon iconName="arrow-right"/>
            <Icon iconName="arrow-right"/>
        </div>
        <div class='videoFooter_actionsRight'>
            <div class='vidoeFooter_stat'>
                <Icon iconName="arrow-right"/>
                <p>23</p>
            </div>
            <div class='vidoeFooter_stat'>
                <Icon iconName="arrow-right"/>
                <p>34</p>
            </div>
        </div>
    </div>
</div>