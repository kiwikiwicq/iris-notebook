---
title: "Arch Linux: A Minimal Setup Guide"
description: "How to bootstrap a minimal, fast, and secure Arch Linux installation from scratch, focusing on modern Wayland tools."
date: "2026-05-15"
category: "Linux"
tags: ["Linux", "Arch", "Wayland"]
image: "/assets/Screenshot 2026-07-08 161543.png"
published: true
---

## The Philosophy of Arch

Arch Linux is built on the philosophy of **simplicity** and **user-centricity**. It doesn't configure anything for you. Instead, it provides the tools you need to build the exact operating system you want.

## Bootstrap Phase

After burning the ISO and booting, the first steps involve partitioning your disk and installing the base system.

### Disk Partitioning

I prefer a simple layout using `fdisk`:
1. `/boot` - 512MB (EFI System)
2. `[swap]` - 8GB (Linux swap)
3. `/` - Remaining space (Linux filesystem)

### The Base Install

We use `pacstrap` to install the essential packages:

```bash
# Mount your partitions first
mount /dev/sda3 /mnt
mkdir /mnt/boot
mount /dev/sda1 /mnt/boot

# Install the base system
pacstrap -K /mnt base linux linux-firmware neovim networkmanager
```

## The Wayland Desktop

For a modern desktop, X11 is out and Wayland is in. I use **Hyprland** as my compositor.

```bash
# Install Hyprland and core tools
pacman -S hyprland kitty waybar wofi
```

### Essential Utilities

You'll need a few more things to make the desktop usable:
- **Pipewire** for audio
- **Grim/Slurp** for screenshots
- **Wl-clipboard** for clipboard management

## Conclusion
Building your own OS from the ground up takes time, but the result is a deeply personal, bloat-free system that you fully understand.
