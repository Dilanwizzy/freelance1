<script lang="ts">
	import { commonRoutes } from '$lib/utils/constants';
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<img
			class="mx-auto h-10 w-auto"
			src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
			alt="Your Company"
		/>
		<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
			{#if data.mode === 'signin'}
				Sign in to your account
			{:else}
				Register to make use of our platform
			{/if}
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-4" method="POST" use:enhance>
			<div>
				<label for="username" class="block text-sm font-medium leading-6">
					{#if data.mode === 'signin'}
						Username/Email *
					{:else}
						Username
					{/if}
				</label>
				<div class="mt-2">
					<input
						id="username"
						name="username"
						type="text"
						required={data.mode === 'signin'}
						aria-invalid={!!form?.errors.username}
						aria-errormessage="username-error"
						class="input p-2"
					/>
				</div>
			</div>

			<div>
				{#if data.mode === 'signup'}
					<label for="email" class="block text-sm font-medium leading-6">Email *</label>
					<div class="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							class="input p-2"
						/>
					</div>
				{/if}
			</div>

			<div>
				<div class="flex items-center justify-between">
					<label for="password" class="block text-sm font-medium leading-6">Password *</label>
					{#if data.mode === 'signin'}
						<div class="text-sm">
							<a href="#" class="text-tertiary-700">Forgot password?</a>
						</div>
					{/if}
				</div>
				<div class="mt-2">
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="input p-2"
						aria-invalid={!!form?.errors.password}
						aria-errormessage="password-error"
					/>
				</div>
			</div>

			<div>
				<input name="mode" type="hidden" value={data.mode} />
				<button type="submit" class="btn variant-filled-tertiary w-full"
					>{`Sign ${data.mode === 'signin' ? 'In' : 'Up'}`}</button
				>
			</div>
		</form>
		<div class="flex justify-between flex-wrap mt-2">
			<p class="text-sm unstyled py-2 text-slate-500">
				{#if data.mode === 'signin'}
					Not registered yet? <a href={`${commonRoutes.login}?mode=signup`}>Sign Up</a>
				{:else}
					Already have an account? <a href={commonRoutes.login}>Sign In</a>
				{/if}
			</p>
		</div>
	</div>
</div>

<!-- <main>
	<form method="POST" use:enhance>
		<h1>{`Sign ${data.mode === 'signin' ? 'In' : 'Up'}`}</h1>

		<h2>
			{#if data.mode === 'signin'}
				Not registered yet? <a href={`${commonRoutes.login}?mode=signup`}>Sign Up</a>
			{:else}
				Already have an account? <a href={commonRoutes.login}>Sign In</a>
			{/if}
		</h2>

		<hr />

		{#if form?.errors.banner}
			<div role="alert">{form.errors.banner}</div>
		{/if}

		<label for="username">Username</label>
		<input
			id="username"
			name="username"
			placeholder="Username"
			type="text"
			aria-invalid={!!form?.errors.username}
			aria-errormessage="username-error"
		/>

		{#if !!form?.errors.username}
			<div id="username-error" role="alert">{form.errors.username}</div>
		{/if}

		{#if data.mode === 'signup'}
			<label for="email">Email</label>
			<input
				id="email"
				name="email"
				placeholder="Email Address"
				type="email"
				aria-invalid={!!form?.errors.email}
				aria-errormessage="email-error"
			/>
			{#if !!form?.errors.email}
				<div id="email-error" role="alert">{form.errors.email}</div>
			{/if}
		{/if}

		<label for="password">Password</label>
		<input
			id="password"
			name="password"
			placeholder="Password"
			type="password"
			aria-invalid={!!form?.errors.password}
			aria-errormessage="password-error"
		/>
		{#if !!form?.errors.password}
			<div id="password-error" role="alert">{form.errors.password}</div>
		{/if}

		<input name="mode" type="hidden" value={data.mode} />
		<button type="submit">{`Sign ${data.mode === 'signin' ? 'In' : 'Up'}`}</button>

		{#if data.mode === 'signin'}
			<a class="forgot-password" href={commonRoutes.resetPassword}>Forgot password?</a>
		{/if}
	</form>
</main> -->

<style>
	.wrapper {
		min-height: 900px;
		background-size: cover;
		background-image: url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80);
	}

	.form {
		min-height: 900px;
	}
</style>
