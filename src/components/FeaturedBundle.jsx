"use client"
import React from 'react'
import { useProducts } from '@/contexts/ProductContext'
import Image from 'next/image'
import Link from 'next/link'
import CtaButton from './CtaButton'
import OutlineButton from './OutlineButton'

function FeaturedBundle() {
  const { products } = useProducts()

  const featuredBundle = products?.find(product =>
    product.name?.toLowerCase().includes("glow & renew trio bundle")
  )

  if (!featuredBundle) return null

  return (
    <div className="w-full bg-primary-foreground rounded-2xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image Section */}
        <div className="relative h-96 lg:h-auto lg:min-h-[500px]">
          <Image
            src={featuredBundle.image}
            fill
            alt={featuredBundle.name}
            className="object-cover"
          />
          {featuredBundle.discounted_price && (
            <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
              SAVE PKR {featuredBundle.price - featuredBundle.discounted_price}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center p-8 lg:p-16 gap-y-6">
          <span className="text-primary text-sm uppercase font-semibold tracking-wider">
            Featured Bundle
          </span>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold leading-tight">
            {featuredBundle.name}
          </h2>
          {featuredBundle.tagline && (
            <p className="text-text/80 text-lg">{featuredBundle.tagline}</p>
          )}
          {featuredBundle.description && (
            <p className="text-text/70 text-base leading-relaxed">
              {featuredBundle.description}
            </p>
          )}

          {/* Products in bundle */}
          {featuredBundle.products && featuredBundle.products.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {featuredBundle.products.map((prod, index) => (
                <span key={index} className="text-text/60 text-sm uppercase bg-secondary px-3 py-1 rounded-full">
                  {prod}
                </span>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex flex-col gap-y-2">
            <div className="flex items-baseline gap-x-3">
              <span className="font-heading text-4xl font-bold">
                PKR {featuredBundle.discounted_price || featuredBundle.price}
              </span>
              {featuredBundle.discounted_price && (
                <span className="font-heading text-2xl line-through text-text/50">
                  PKR {featuredBundle.price}
                </span>
              )}
            </div>
            {featuredBundle.discounted_price && (
              <span className="text-primary font-semibold">
                You save PKR {featuredBundle.price - featuredBundle.discounted_price}
              </span>
            )}
          </div>

          {/* CTA Button */}
          <Link href={`/product/${featuredBundle.id}`} className="w-fit">
            <CtaButton>Shop Bundle</CtaButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FeaturedBundle